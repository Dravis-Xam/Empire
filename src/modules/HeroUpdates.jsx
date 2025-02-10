const heroUpdates = [
    {
        id: '001',
        type: "Christmas Offers",
        starts: "1-december",
        duration: "30",
        durationUnit: "days",
        description: "Special holiday discounts!",
        bg: "https://thumbs.dreamstime.com/b/christmas-reindeer-red-santa-claus-cap-snowy-forest-337490459.jpg",
        specs: {
            discountOnItem: 0.1,
            getOneFree: null,
            itemsOnOffer: [
                { itemId: 7001 }, 
                { itemId: 7002 },
                { itemId: 7004 }
            ]
        }
    },
    {
        id: '002',
        type: "Easter Offers",
        starts: "1-April",
        duration: "2",
        durationUnit: "weeks",
        description: "Spring special deals!",
        bg: "https://foodal.com/wp-content/uploads/2015/04/Easter-Eggs-and-How-to-Use-Them-Up.jpg",
        specs: {
            discountOnItem: null,
            getOneFree: true,
            itemsOnOffer: [
                { itemId: 7001 },
                { itemId: 7003 },
                { itemId: 7004 }
            ]
        }
    },
    {
        id: '003',
        type: "Halloween Offers",
        starts: "14-october",
        duration: "2",
        durationUnit: "week",
        description: "Spooky season savings!",
        bg: "https://t3.ftcdn.net/jpg/12/26/73/92/360_F_1226739206_M4vMLyGR9RVJjuXxocedUuQ6qM7M3wk4.jpg",
        specs: {
            discountOnItem: null,
            getOneFree: true,
            itemsOnOffer: [
                { itemId: 7003 }, 
                { itemId: 7002 },
                { itemId: 7005 }
            ]
        }
    },
];

export default heroUpdates;