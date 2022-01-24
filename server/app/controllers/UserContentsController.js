const {
  UserContent,
  User,
  Content,
  UserProfile,
  Log
} = require('../models')

class UserContentsController{
  static async postUserContent(req, res, next) {
    try {
      const {id: UserId} = req.user 
      const {
        ContentId,
        isLike = false,
        status = 'started'
      } = req.body

      const userContent = await UserContent.create({
        UserId,
        ContentId,
        isLike,
        status
      })

      res.status(201).json(userContent)
    } catch (error) {
      next(error)
    }
  }

  static async getUserContent(req, res, next) {
    try {
      const userContent = await UserContent.findAll({
        include: [{
          model: User,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }, 
        {
          model: Content,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })

      res.status(200).json(userContent)
    } catch (error) {
      next(error)
    }
  }

  static async getUserContentDetail(req, res, next) {
    try {
      const { id } = req.params
      const userContentDetail = await UserContent.findOne({
        include: [{
          model: User,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }, 
        {
          model: Content,
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }],
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }, 
      {
        where: {
          id
        }
      })

      res.status(200).json(userContentDetail)
    } catch (error) {
      next(error)
    }
  }

  static async putUserContent(req, res, next) {
    try {
      const { id: ContentId } = req.params
      const { id: UserId } = req.user
      
      const findContent = await UserContent.findOne({
        where: {
          ContentId
        }
      })
      
      if (!findContent) throw {name: `Content_Not_Found` }
      // Ambil Level
      const levelUser = await UserProfile.findOne({
        where: {
          UserId
        }
      })
      
      // Ambil Total Content Base current user level
      
      const LevelId = levelUser.LevelId
      const content = await Content.findAll({
        where: {
          LevelId
        }
      })
      // if (!content) throw {name: `Content_Not_Found` }
      const lastContentId = content[content.length-1].id
      
      let message;
      let code;

      // compare content base User content
      if (lastContentId !== findContent.id) {
        // Update content
        await UserContent.update({
          status : 'finish'
        }, {
          where: {
            ContentId
          }
        })
        code = 200;
        message = `Congrats! You finished! Go to the next exercise..`;
      } else {
        // Update Status User Content
        await UserContent.update({
          status : 'finish'
        }, {
          where: {
            ContentId
          }
        })

        // Find Level
        const findLevel = await UserProfile.findOne({
          where: {
            UserId
          },
        });

        // Condition
        const getLog = await Log.findOne({
          where: {
            UserId
          }
        })

        if (findLevel.LevelId === 3) {
          code = 200;
          message = `Congrats! You reach maximum Level!`;
        } else {
          if (findLevel.LevelId === 2) {
            // Update Profile
            const profile = await UserProfile.update(
              {
                LevelId: 3,
              },
              {
                where: {
                  UserId,
                },
                returning: true,
              }
            );
            
            // Post Log History
            await Log.create({
              height: getLog.height,
              weight: getLog.weight,
              activityLevel: getLog.activityLevel,
              UserId,
              LevelId: 3,
            })

            code = 200;
            message = `Congrats, You did It! You level up to Hard Level!`;
          } else {
            await UserProfile.update(
              {
                LevelId: 2,
              },
              {
                where: {
                  UserId,
                },
              }
            );

            // Post Log History
           
            await Log.create({
              height: getLog.height,
              weight: getLog.weight,
              activityLevel: getLog.activityLevel,
              UserId,
              LevelId: 2,
            })

            code = 200;
            message = `Congrats, You did It! You level up to Medium Level!`;
          }
        }
      }
         
      res.status(code).json({ message });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserContentsController