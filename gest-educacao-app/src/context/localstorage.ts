
export default class LocalStorageSite {

    incluirLocalstorage(nome: string) {
        localStorage.setItem('SESSAO', nome);
    }

    obterLocalstorage() {
        return localStorage.getItem('SESSAO');
    }
    removerLocalStorage() {
        localStorage.removeItem('SESSAO');
    }
}