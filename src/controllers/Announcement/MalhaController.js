const Malha = require('../../models/Announcement/Malha')

module.exports = {
  async index(req, res) {
    const malhas = await Malha.find()
                              .populate('userId')
                              .exec()
    return res.json(malhas)
  },
  async detail(req, res) {
    const malha = await Malha.findById(req.params.id)
                             .populate('userId')
                             .exec()
    return res.json(malha)
  },
  async store(req, res) {
    const malha = await Malha.create(req.body)
    return res.json(malha)
  },
  async update(req, res) {
    const malha = await Malha.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    return res.json(malha)
  },
  async destroy(req, res) {
    await Malha.findOneAndRemove({_id: req.params.id})
    return res.send()
  },
  async indexType(req, res) {
    // Index from ADS and NAME
    if( req.body.adsTipo && !req.body.userId && !req.body.uf && req.body.name ) {
      const malhas = await Malha.find({ titulo: { $regex: new RegExp(req.body.name), $options: 'i' } , adsTipo: req.body.adsTipo }).populate('userId').exec()
      
      function removeNullResults(array) {
        var result = array.filter(function(el) {
          return el.userId === null;
        });
        for(var elemento of result) {
          var index = array.indexOf(elemento);
          array.splice(index, 1);
        };
        return array;
      }
      
      return res.json(removeNullResults(malhas));
    } 
    // Index from ADS
    else if( req.body.adsTipo && !req.body.userId && !req.body.uf && !req.body.name ) {
      const malhas = await Malha.find({ adsTipo: req.body.adsTipo }).populate('userId').exec()
      
      function removeNullResults(array) {
        var result = array.filter(function(el) {
          return el.userId === null;
        });
        for(var elemento of result) {
          var index = array.indexOf(elemento);
          array.splice(index, 1);
        };
        return array;
      }
      
      return res.json(removeNullResults(malhas));
    } 
    // Index from USERID
    else if ( !req.body.adsTipo && req.body.userId && !req.body.uf && !req.body.name ) {
      const malhas = await Malha.find().populate({
        path: 'userId',
        match: { _id: req.body.userId }
      }).exec()

      function removeNullResults(array) {
        var result = array.filter(function(el) {
          return el.userId === null;
        });
        for(var elemento of result) {
          var index = array.indexOf(elemento);
          array.splice(index, 1);
        };
        return array;
      }
      
      return res.json(removeNullResults(malhas));
    } 
    // Index from ADS and USERID
    else if ( req.body.adsTipo && req.body.userId && !req.body.uf && !req.body.name ) {
      const malhas = await Malha.find({ adsTipo: req.body.adsTipo }).populate({
        path: 'userId',
        match: { _id: req.body.userId }
      }).exec()

      function removeNullResults(array) {
        var result = array.filter(function(el) {
          return el.userId === null;
        });
        for(var elemento of result) {
          var index = array.indexOf(elemento);
          array.splice(index, 1);
        };
        return array;
      }
      
      return res.json(removeNullResults(malhas));
    }
    // Index from ADS and UF    
    else if ( req.body.adsTipo && !req.body.userId && req.body.uf && !req.body.name ) {
      const malhas = await Malha.find({ adsTipo: req.body.adsTipo, }).populate({
        path: 'userId',
        match: { UF: req.body.uf }
      }).exec()

      function removeNullResults(array) {
        var result = array.filter(function(el) {
          return el.userId === null;
        });
        for(var elemento of result) {
          var index = array.indexOf(elemento);
          array.splice(index, 1);
        };
        return array;
      }
      
      return res.json(removeNullResults(malhas));
    }
    // Index from ADS and UF and NAME
    else if ( req.body.adsTipo && !req.body.userId && req.body.uf && req.body.name ) {
      const malhas = await Malha.find({ titulo: { $regex: new RegExp(req.body.name), $options: 'i' } , adsTipo: req.body.adsTipo, }).populate({
        path: 'userId',
        match: { UF: req.body.uf }
      }).exec()

      function removeNullResults(array) {
        var result = array.filter(function(el) {
          return el.userId === null;
        });
        for(var elemento of result) {
          var index = array.indexOf(elemento);
          array.splice(index, 1);
        };
        return array;
      }
      
      return res.json(removeNullResults(malhas));
    } 
    // Bad request
    else {
      return res.send("Error: bad request. <br/> Expected <pre>adsType, userId, uf</pre>")
    }
  },
}