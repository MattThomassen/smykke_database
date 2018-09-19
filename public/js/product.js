
document.addEventListener('DOMContentLoaded', () => {







    let formUpdate = document.querySelector('#formUpdate');
    const textNavn = formUpdate.navn;
    // const textNavn = formUpdate.querySelector('.navn');
    // const textNavn = document.querySelector('#formUpdate .navn');
    const textPris = document.querySelector('#formUpdate .pris');
    const textBeskrivelse = document.querySelector('#formUpdate .beskrivelse');
    const selectKategori = document.querySelector('#formUpdate .kategori');
    const selectMetal = document.querySelector('#formUpdate .metal');
    const btnUpdate = document.querySelector('#formUpdate .submit');
    const divMsg = document.querySelector('#msg');

    btnUpdate.addEventListener('click', (event) => {
        event.preventDefault();
        divMsg.innerHTML = "";
        let produkt = {
            "navn": textNavn.value,
            "pris": textPris.value,
            "kategori": selectKategori.value,
            "beskrivelse": textBeskrivelse.value,
            "metal": selectMetal.value,
        }

        console.log(produkt)

        validateAndSend(produkt)

        async function validateAndSend(produkt) {

            let lengthOk = checkMinLength(produkt.navn, 2);
            if (lengthOk) {
                let nytNavn = !await checkNameinDB(produkt.navn);
                if (nytNavn) {
                    // formUpdate.submit();
                    document.createElement('form').submit.call(formUpdate);
                    divMsg.innerHTML = 'Produktet er opdateret';
                } else {
                    textNavn.select();
                    divMsg.innerHTML = "Navnet findes i forevejen";
                }
            } else {
                textNavn.select();
                divMsg.innerHTML = "Navn skal være mindst 2 tegn";
            }
        }

        // Tjek om produktnavn findes i db
        function checkMinLength(text, length) {
            return (text.length >= length);
        }

        function checkNameinDB(name) {
            const url = `/countName/${name}`;
            return fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    return (result.antal > 0); // returnerer true hvis tallet er større end 0, ellers returneres false
                })
        }
    })

})

