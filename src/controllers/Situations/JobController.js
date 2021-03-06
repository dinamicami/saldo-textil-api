const Job = require('../../models/Situations/Job')

module.exports = {
  async index(req, res) {
    // Find by name and state
    if(req.body.name && req.body.uf) {
      const jobs = await Job.find({ title: { $regex: new RegExp(req.body.name), $options: 'i' }, states: { $regex: new RegExp(req.body.uf), $options: 'i' } }).populate('postedBy').exec()
      return res.json(jobs)
    }
    // Find by name
    else if(req.body.name && !req.body.uf) {
      const jobs = await Job.find({ title: { $regex: new RegExp(req.body.name), $options: 'i' } }).populate('postedBy').exec()
      return res.json(jobs)
    }
    // Find by state
    else if(!req.body.name && req.body.uf) {
      const jobs = await Job.find({ states: { $regex: new RegExp(req.body.uf), $options: 'i' } }).populate('postedBy').exec()
      return res.json(jobs)  
    }
    // Find All
    else {
      const jobs = await Job.find().populate('postedBy').exec()
      return res.json(jobs)  
    }
  },
  async detail(req, res) {
    const job = await Job.findById(req.params.id)
                         .populate('postedBy')
                         .exec()
    return res.json(job)
  },
  async store(req, res) {
    const job = await Job.create(req.body)
    return res.json(job)
  },
  async update(req, res) {
    const job = await Job.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    return res.json(job)
  },
  async destroy(req, res) {
    await Job.findOneAndRemove({_id: req.params.id})
    return res.send()
  }
}