const  express = require('express');
const  router = express.Router();
const multer = require("multer");

// 스키마 만들기
const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");
const { User } = require("../Model/User.js");

// 네이버 클라우드와 연결
const setUpload = require("../util/upload.js");

// 글 쓰기
router.post("/write", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
    };

    // 번호 추가
    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            // 작성자 추가
            User.findOne({ uid: req.body.uid})
            .exec()
            .then((userInfo) => {
                temp.author = userInfo._id;

                const BlogWrite = new Post(temp);
                BlogWrite
                    .save()
                    .then(() => {
                        // 숫자 증가
                        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(() => {
                            res.status(200).json({ success: true });
                        })
                    })
            })

        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

// 글 목록
router.post("/list", (req, res) => {
    Post
    .find()
    .populate("author")
    .exec()
    .then((result) => {
        res.status(200).json({success: true, postList: result})
    })
    .catch((err) => {
        res.status(400).json({success: false})
    })
})

// 글 상세페이지
router.post("/detail", (req, res) => {
    Post.findOne({postNum: req.body.postNum})
    .populate("author")
    .exec()
    .then((result) => {
        console.log(result)
        res.status(200).json({success: true, post: result})
    })
    .catch((err) => {
        console.log(err)
        res.status(400).json({success: false})
    })
})

// 글 수정하기
router.post("/modify", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    }
    Post.updateOne({postNum: Number(req.body.postNum)}, {$set: temp})
        .exec()
        .then(() => {
            res.status(200).json({success: true})
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({success: false})
        })
})

// 글 삭제하기
router.post("/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum)})
        .exec()
        .then(() => {
            res.status(200).json({success: true})
        })
        .catch(() => {
            console.log(err)
            res.status(400).json({success: false})
        })
})

// 이미지 업로드 (local)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "image/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//     // console.log(req.body, req.formData); 
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(400).json({ success: false });
//         } else {
//             res.status(200).json({ success: true, filePath: res.req.file.path })
//         }
//     })
// })

// 이미지 업로드
router.post("/image/upload", setUpload("react-blog1000/post"), (req, res, next) => {
    console.log(res.req)
    res.status(200).json({success: true, filePath: res.req.file.location})
})

module.exports = router; 