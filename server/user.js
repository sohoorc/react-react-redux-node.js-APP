const express = require('express')
const utils = require('utility') // MD5

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req, res){
	// User.remove({},function(e,d){})
	User.find({},function(err,doc){
		return res.json(doc)
	})
})

Router.post('/login',function(req,res){
	const {user,pwd} = req.body
	// find接收的第一个参数为需要查询的项，第二个参数为返回结果中需要过滤的项
	User.findOne({user,'pwd':md5Pwd(pwd)},{pwd:0,__v:0},function(err,doc){
		if(!doc){
			return res.json({code:1,msg:"用户名或密码有误！"})
		}
		res.cookie('userid',doc._id)
		return res.json({code:0,data:doc})
	})
})


Router.post('/register', function(req, res){
	const {user, pwd, type} = req.body
	User.findOne({user},function(err,doc){
		if (doc) {
			return res.json({code:1,msg:'用户名重复'})
		}
		
		const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'后端出错了'})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})
	})
})

Router.post('/update', function(req, res){
	const userid = req.cookies.userid
	if(!userid){
		return json.dumps({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})
})

Router.get('/info',function(req, res){
	const {userid} = req.cookies
	if (!userid) {
		return res.json({code:1})
	}
	User.findOne({_id:userid} ,_filter , function(err,doc){
		if (err) {
			return res.json({code:1, msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:0,data:doc})
		}
	})
})

function md5Pwd(pwd){
	const salt = 'dsfajdklsafjdlsafiofnasfjkdlsaf'
	return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router