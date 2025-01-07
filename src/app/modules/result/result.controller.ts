/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ResultServices } from "./result.services";





const createResult = catchAsync(async (req,res) => {
    const result = await ResultServices.createResult(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Result created successfully.",
      data: result,
    });
  });

  const getAllResults = catchAsync(async (req, res) => {
    const results = await ResultServices.getAllResults();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Results retrieved successfully.",
      data: results,
    });
  });
  


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
    } catch (error:any) {
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message || "An error occurred while fetching subjects.",
      });
    }
  });


  // Controller Method: Get result by boardRoll and semesterId
const getResultByBoardRollAndSemester = catchAsync(async (req, res) => {
    const { boardRoll, semesterId } = req.query;
  
    if (!boardRoll || !semesterId) {
      return res.status(400).json({ success: false, message: "BoardRoll and SemesterId are required." });
    }
  
    try {
      const result = await ResultServices.getResultByBoardRollAndSemester(boardRoll as string, semesterId as string);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Result retrieved successfully.",
        data: result,
      });
    } catch (error:any) {
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message || "An error occurred while fetching the result.",
      });
    }
  });


 // Controller Method: Update obtained marks for a specific subject in a result
 const updateResultObtainedMarks = catchAsync(async (req, res) => {
  const { resultId, subjectUpdates } = req.body;

  // Validate if resultId and subjectUpdates are provided
  if (!resultId || !subjectUpdates || subjectUpdates.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Result ID and at least one subject update (subjectId, obtainedMarks) are required."
    });
  }

  try {
    // Iterate over subjectUpdates to update each subject
    const updatedSubjects = [];
    for (const update of subjectUpdates) {
      const { subjectId, obtainedMarks } = update;

      // Validate that subjectId and obtainedMarks are present in each update
      if (!subjectId || obtainedMarks === undefined) {
        return res.status(400).json({
          success: false,
          message: "Subject ID and obtained marks are required for each subject."
        });
      }

      // Call the service to update the obtained marks for each subject
      const updatedSubject = await ResultServices.updateObtainedMarks(resultId, subjectId, obtainedMarks);
      updatedSubjects.push(updatedSubject);
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Marks updated successfully ",
      data: updatedSubjects
    });
  } catch (error:any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "An error occurred while updating obtained marks."
    });
  }
});




export const  ResultController= {
    createResult,
   getSubjectsBySemester,
    getResultByBoardRollAndSemester,
    getAllResults,
    updateResultObtainedMarks
    
};
