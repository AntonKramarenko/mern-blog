import PostModel from '../models/Post.js'

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageURL: req.body.imageURL,
            user: req.userId,
        })

        const post = await doc.save()
        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to get posts'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to create post'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' },
            (error, doc) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({
                        message: 'Failed to get post'
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Post not found'
                    })
                }

                res.json(doc)
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to get post'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId
        }, (error, doc) => {
            if (error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Failed to remove post'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Post not found'
                })
            }

            res.json({
                success: true
            })
        }
        )


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to remove post'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageURL: req.body.imageURL,
                user: req.userId,
            }
        )

        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Post update failed"
        })
    }
}