export async function LogUser(username: string, mail: string, password: string) {
    try {
        console.log('Log called 1 : ', mail)
        const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                mail,
                password,
            }),
        });
        console.log('Log called 2')

        if (response.ok) {
            const userData = await response.json();
            return userData;
        }
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur2', error);
        throw error; 
    }
}