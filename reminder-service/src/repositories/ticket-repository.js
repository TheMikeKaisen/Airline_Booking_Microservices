const { Op } = require("sequelize");
const {NotificationTicket} = require("../models/");


class TicketRepository {
    async getAll() {
        try {
            const tickets = await NotificationTicket.findAll();
            return tickets;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(data) {
        try {
            const ticket = NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            console.log("error in repo: ", error)
            throw error;
        }
    }

    async get(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    },
                }
            })
            return tickets;
        } catch (error) {
            
        }
    }

    async update(ticketId, data) {
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            if(data.status){
                ticket.status = data.status;
            }
            await ticket.save();
            return ticket;

        } catch (error) {
            console.log("unable to update data!")
            throw error;
        }
    }
}

module.exports = TicketRepository
