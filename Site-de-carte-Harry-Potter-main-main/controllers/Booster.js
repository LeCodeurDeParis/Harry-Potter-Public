const prisma = require("../config/prisma");

class BoosterController {

    async openBooster(req, res){
        try {
            const id = req.body.userId
            const user  = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })
            const isCountdownUp = Number(user.LastBooster) - Date.now()
            console.log(isCountdownUp)
            if (isCountdownUp > 0) return res.status(403).json({ message: "Booster déjà ouvert pour aujourd'hui !" })
            const HpFetch = await fetch("https://hp-api.lainocs.fr/characters")
            const CardHp = await HpFetch.json()
            let boosterCard = []
            for (let i = 0; i < 5; i++){
                let randomIndex = Math.floor(Math.random() * CardHp.length)
                let card = CardHp[randomIndex].id
                let ownerId = user.id
                const cardExist = await prisma.card.findUnique({
                    where: {
                        userId_cardId: {
                            userId: ownerId,
                            cardId: card
                        }
                    }
                })
                if (cardExist) {
                    await prisma.card.update({
                        where: {
                            userId_cardId: {
                                userId: ownerId,
                                cardId: card
                            }
                        },
                        data: {
                            quantity: {
                                increment: 1
                            }
                        }
                    })
                } else {
                    const createCard = await prisma.card.create({
                        data: {
                            name: CardHp[randomIndex].name,
                            userId: id,
                            cardId: card,
                            imageUrl: CardHp[randomIndex].image,
                            actor: CardHp[randomIndex].actor,
                            house: CardHp[randomIndex].house,
                            slug: CardHp[randomIndex].slug
                        }
                    })
                }
                boosterCard.push(CardHp[randomIndex])
            }

            const updateBooster = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    LastBooster: (Date.now() + 1000 * 60 * 60 * 24).toString()
                }
            })
            
            return res.status(200).json(boosterCard)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
    
    

    async resetBooster(req, res){
        try {
            const id = req.body.userId
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            const updateBooster = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    LastBooster: "0"
                }
            })

            return res.status(200).json({ message: "Booster reset" })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
    
}

module.exports = new BoosterController();