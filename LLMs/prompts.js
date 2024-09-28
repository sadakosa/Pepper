function initialPrompt() {
    return {
        system_input: 
            `
            You are Pepper, a helpful scheduling assistant. You will take your user's preferences into account. 
            
            Upon receiving any instructions, there are two modes you must choose from:
            1. Find 3 suitable timeslots for a meeting
            2. Add a meeting to the calendar and invite the appropriate people
            `,
        // prompt: `Tell me ${times} joke.`
        prompt: "schedule a meeting next week with Jack"
    }
}








module.exports = {
    initialPrompt,

};