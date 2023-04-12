const User = require('../models/user');
const express=require('express');

// thêm mới user
module.exports.add_get = (req, res) => {
    res.render('add',{Title:"thêm mới user"});
 }

module.exports.add_post = (req, res) => { 
    console.loglog=(req.body.name);
    const usernew = new User({ 
        name: req.body.name,
        manv: req.body.manv,
        anhdaidien: req.body.anhdaidien,
        diemtrungbinh: req.body.diemtrungbinh

    })
    usernew.save()
    .then((result)=>{
        res.redirect('/');
    }
    )
    .catch((err)=>{
        console.log(err);
    })

}


// sửa user
module.exports.edit_get = async (req, res) => {
    const users= await User.findById(req.params.id);
   res.render('edit',{Title:"sửa user", object: users.toJSON()});

 }
module.exports.edit_post = async (req, res) => { 
    const user= req.params.id;
    try {
        const usernew= await User.findByIdAndUpdate({_id:user},req.body);
        res.redirect('/');
    } catch (error) {
        
    }

}
// xóa user
module.exports.delete_get = async (req, res) => { 
    const users= req.params.id;
    try {
        const usernew=await User.findByIdAndRemove(users); 
        res.redirect('/');
    } catch (error) {
    }
}

// tìm kiếm user
module.exports.timkiem_get = async (req, res) => {
    let name=req.query.name;
    const rex = new RegExp(name,'i');
    let name_search= await User.find({name:{ $regex: rex }});
    res.render('home',{Title:"tìm kiếm user", data:name_search.map((user)=>user.toJSON())});

}
module.exports.home = async (req, res) => { 
    const users= await User.find();
    console.log("aray",users);
    res.render('home',{Title:"home", data:users.map((user)=>user.toJSON())});
}