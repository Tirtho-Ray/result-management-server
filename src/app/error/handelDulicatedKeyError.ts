import { TErrorSource } from "./interface/err";


const handleDuplicateKeyError = (err:any) => {

    const duplicateValueMatch = err.message.match(/dup key: \{.*: "(.*)" \}/);
    const duplicateValue = duplicateValueMatch ? duplicateValueMatch[1] : "Unknown";
  
    const errorSources: TErrorSource = [
      {
        path: "", // Assuming 'name' is the field that caused the duplicate key error
        message: ` ${duplicateValue} is already exits`,
      },
    ];
  
    const statusCode = 409; // Conflict status code
    return {
      statusCode,
      message:'already exists',
      errorSources,
    };
  };

export default handleDuplicateKeyError;