export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            areas: data.areas,
            hourlyRate: data.rate
        };

        const response = await fetch(context.rootGetters.config.coaches + `/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        // const responseData = await response.json();

        if (!response.ok) {
            // error ...
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context) {
        const response = await fetch(context.rootGetters.config.coaches + `.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!')
            throw error;
        }

        const coaches = [];
        for (const key in responseData) {
            const coach =   {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                areas: responseData[key].areas,
                hourlyRate: responseData[key].hourlyRate
            }
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches)


    }
};