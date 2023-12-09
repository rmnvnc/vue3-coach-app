export default {
    registerCoach(context, data) {
        const coachData = {
            id: 'c3',
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            areas: data.areas,
            hourlyRate: data.rate
        };
        context.commit('registerCoach', coachData);
    }
};