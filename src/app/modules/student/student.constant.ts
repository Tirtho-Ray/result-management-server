export interface StudentQueryParams {
    collageRoll?: string;
    boardRoll?: string;
    departmentId?: string;
    semesterId?: string;
    limit?: string; // Parsed later as number
    page?: string;  // Parsed later as number
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }

 ;
  