const Jobs = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllJobs = async(req, res) => {
    const jobs = await Jobs.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}

const getJob = async(req, res) => {
    const {user: {userId}, params: {id: jobId}} = req
    const job = await Jobs.findOne({_id: jobId, createdBy: userId})
    if(!job) {
        throw new NotFoundError(`No job was found with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId 
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}

const updateJob = async(req, res) => {
    const {body: {company, position}, user: {userId}, params: {id: jobId}} = req
    if(company === " " || position === " "){
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Jobs.findByIdAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators: true})
    if(!job){
        throw new NotFoundError(`No job with id ${jobId} found`)
    }
    res.status(StatusCodes.CREATED).json(job)
}
const deleteJob = async(req, res) => {
    const {user: userid, params: {id: jobId}} = req
    const job = await Jobs.findByIdAndRemove({_id: jobId, createdBy: userid})
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json('Job DELETED')
}
<<<<<<< HEAD

module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}
=======
 
module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}
>>>>>>> 3ebcf7e62402c96cd95ed466584b05422412ceec
