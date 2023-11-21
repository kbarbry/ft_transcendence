
export async function Log42() {
    //const [cookies, setCookie] = useCookies(["user"]);

    try {
        console.log('Log called 1 : ')
        const response = await fetch('http://127.0.0.1:3000/api/auth/42/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
           },            
        });
        console.log('Log called 2')

        if (response.ok) {
            const userData = await response.json();
            const setCookieHeader = response.headers.get('Set-Cookie');
            console.log('COOKIIIE =>' , setCookieHeader)
            console.log('formData => ', response.formData)
            console.log(response)
            let x = document.cookie
            console.log('COKIES DOCUMENT => ', x)
            return userData;
        }
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur2', error);
        throw error; 
    }
}