const base = 'http://localhost:4000';

const post = async (base, route, body) => {
    const response = await fetch (base + route, {
        credentials: 'include',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Conetnt-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    return response;
};

export {base, post};