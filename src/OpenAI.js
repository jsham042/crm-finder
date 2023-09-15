async function searchInternetForInformation(searchQuery) {
    const llm = new ChatOpenAI({
        model: 'gpt-4',
        temperature: 0.0,
        openaiApiKey: 'your_openai_api_key_here',
    });

    const search = new SerpAPIWrapper({
        serpApiKey: 'your_serpapi_api_key_here',
    });

    const tools = [
        {
            name: "Intermediate Answer",
            func: search.run,
            description: "useful for when you need to ask with search",
        }
    ];

    const selfAskWithSearch = initializeAgent(
        tools,
        llm,
        {
            agentType: 'SELF_ASK_WITH_SEARCH',
            verbose: false
        }
    );

    const answer = await selfAskWithSearch.run(searchQuery);
    return answer;
}