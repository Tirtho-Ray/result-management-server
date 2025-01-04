import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ResultServices } from "./result.services";



// const createResult =catchAsync(async(req,res)=>{
//     const result = await ResultServices.createResult(req.body);
//     sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: " create result successfully",
//         data: result
//     });
// });

const createResult = catchAsync(async (req,res) => {
    const result = await ResultServices.createResult(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Result created successfully.",
      data: result,
    });
  });

// const createPost = catchAsync(async (req, res) => {
//     const userId = req.user.id;
//     const { title, content, categories, premium,keywords,image } = req.body;

//     const payload = {
//         user: userId,
//         title,
//         image,
//         content,
//         categories,
//         premium,// Add 'premium' field
//          keywords
//     };

//     const post = await PostServices.createPostIntoDB(payload);

//     // Update the user's posts array
//     await User.findByIdAndUpdate(userId, {
//         $push: { posts: post._id }
//     });

//     sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: "Post created successfully",
//         data: post,
//     });
// });

const getResult = catchAsync ( (async(req,res) =>{
    const result = await ResultServices.getAllResults();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "result retrieved successfully",
        data: result
    });
}))

/// Get subjects by semester controller
const getSubjectsBySemester = catchAsync(async (req, res) => {
    const { semesterId } = req.query;
  
    if (!semesterId) {
      return res.status(400).json({ success: false, message: "Semester ID is required." });
    }
  
    try {
      const subjects = await ResultServices.fetchSubjectsBySemester(semesterId as string);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subjects retrieved successfully.",
        data: subjects,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message || "An error occurred while fetching subjects.",
      });
    }
  });
  
export const  ResultController= {
    createResult,
    getResult,
    getSubjectsBySemester
};
