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

        const token = context.rootGetters.token; 

        const response = await fetch(context.rootGetters.config.firebase + `/coaches/${userId}.json?auth=${token}`, {
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
    async loadCoaches(context, payload) {
        // compare last fetch timestamp with actual timestamp
        const lastFetch = context.getters.lastFetchGetter;
        const currentTimeStamp = new Date().getTime();
        if (lastFetch && ((currentTimeStamp - lastFetch) / 1000 < 60) && !payload.forceRefresh) {
            return;
        }

        const response = await fetch(context.rootGetters.config.firebase + `/coaches.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!')
            throw error;
        }

        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                areas: responseData[key].areas,
                hourlyRate: responseData[key].hourlyRate
            }
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
};