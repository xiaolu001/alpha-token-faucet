import { createI18n } from 'vue-i18n'
import fr from './fr.json'
import en from './en.json'
import jp from "./jp.json"
import es from "./es.json"
import se from "./se.json"
import it from "./it.json"
import de from "./de.json"
import nb from "./nb.json"
import ru from "./ru.json"
import hu from "./hu.json"
import pl from "./pl.json"
import sk from "./sk.json"
const i18n = createI18n({
    legacy:false,
    locale: localStorage.getItem('lang')||'en', 
    messages: {
        en,
        fr,
        jp,
        es,
        se,
        it,
        de,
        nb,
        ru,
        hu,
        pl,
        sk
    }
    // something vue-i18n options here ...
})
export default i18n;