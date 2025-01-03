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

export const  ResultController= {
    createResult,
    getResult
};
