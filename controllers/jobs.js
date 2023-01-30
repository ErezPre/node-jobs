const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(
      `no job with id ${jobId} matches for user ${userId}`
    );
  }
  res.status(StatusCodes.OK).json({ job });
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ length: jobs.length, jobs });
};
const updateJob = async (req, res) => {
  const { company, position } = req.body;
  const jobId = req.params.id;
  userId = req.user.id;
  if (company === "" || position === "") {
    throw new BadRequestError(`company and/or position field is empty`);
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) {
    throw new NotFoundError(`no job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json(job);
};
const getJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(
      `No job with id ${jobId} matches for user ${userId}`
    );
  }
  res.status(StatusCodes.OK).json({ job });
};

module.exports = { createJob, deleteJob, getAllJobs, updateJob, getJob };
