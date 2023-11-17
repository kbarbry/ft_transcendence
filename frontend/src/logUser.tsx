
import Cookies from 'js-cookie';
export async function LogUser(username: string, mail: string, password: string) {
    //const [cookies, setCookie] = useCookies(["user"]);

    try {
        console.log('Log called 1 : ', mail)
        const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            
            body: JSON.stringify({
                username,
                mail,
                password,
            }),
        });
        console.log('Log called 2')

        const cookies = Cookies.get('trans_session');
        console.log('COKIES22 =>> ', cookies)

        //console.log(cookies.user)

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