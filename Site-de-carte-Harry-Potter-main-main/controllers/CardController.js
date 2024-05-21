const q = require("express");
const prisma = require("../config/prisma");

class CardController {
    async index(req, res) {
        try {
        const cards = await prisma.card.findMany();
        return res.status(200).json(cards);
        } catch (e) {
        return res.status(500).json({ message: e.message });
        }
    }
    
    async store(req, res) {
        const body = req.body;
        
        try {
        console.log(body);
        const card = await prisma.card.create({
            data : {
                quantity : body.quantity,
                name : body.name,
                userId : body.userId
            }
        });
        console.log(card);
        return res.status(201).json(card);
        } catch (e) {
        return res.status(500).json({ message: e.message });
        }
    }
    
    async show(req, res) {
        try {
        const id = req.params.id;
        const card = await prisma.card.findUnique({
            where: {
            id: Number(id),
            },
        });
    
        if (!card) return res.status(404).json({ message: "Card not found" });
    
        return res.status(200).json(card);
        } catch (e) {
        return res.status(500).json({ message: e.message });
        }
    }
    
    async update(req, res) {
        try {
        const id = req.params.id;
        const body = req.body;
        const card = await prisma.card.findUnique({
            where: {
            id: Number(id),
            },
        });
    
        if (!card) return res.status(404).json({ message: "Card not found" });
    
        const updatedCard = await prisma.card.update({
            where: {
            id: Number(id),
            },
            data: {
                userId : body.userId,
                name : body.name
            },
        });
    
        return res.status(200).json(updatedCard);
        } catch (e) {
        return res.status(500).json({ message: e.message });
        }
    }
    
    async destroy(req, res) {
        try {
        const id = req.params.id;
        const card = await prisma.card.findUnique({
            where: {
            id: Number(id),
            },
        });
    
        if (!card) return res.status(404).json({ message: "Card not found" });
    
        await prisma.card.delete({
            where: {
            id: Number(id),
            },
        });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
    async getUserCards(req, res){
        try {
            const user = req.user
            const allCards = await prisma.card.findMany({
                where: {
                    userId: user.id
                }
            })


            if (!allCards) return res.status(404).json({ message: "Cartes non trouvées" })
            
            return res.status(200).json({ cards: allCards })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new CardController();