# Racecourse

Organizzazione dei campi di regata: squadre, boe, bandiere e percorsi, con esportazione PDF per i circoli.
Una web app di [Regatta Bearing](https://regattabearing.com), pubblicata su https://racecourse.regattabearing.com

## Come funziona
- Da 1 a 6 campi (Alfa–Foxtrot), con comitato, mezzi, boe, dotazioni e bandiere del codice internazionale.
- Percorso: immagine caricabile con boe, mezzi e frecce (anche curve) posizionabili col dito.
- Esportazione PDF di tutti i campi o di uno solo.
- Italiano e inglese (automatico in base alla lingua del telefono, modificabile in home).
- Installabile sulla schermata Home e funzionante offline.

## Privacy
Tutti i dati (nomi, telefoni, immagini) restano **solo sul dispositivo** di chi usa l'app:
non c'è nessun server che li raccoglie. Per spostarli su un altro telefono si usa
"Dati evento → Esporta backup / Importa backup".

## Pubblicare un aggiornamento
1. Carica i file modificati nel repository (Add file → Upload files → Commit changes).
2. In `sw.js` aumenta il numero della versione (`racecourse-v1` → `racecourse-v2`),
   così i telefoni che hanno l'app installata scaricano la nuova versione.
3. Non cancellare il file `CNAME`: collega il sito a racecourse.regattabearing.com.

## File
- `index.html` — l'app
- `manifest.webmanifest`, `icons/` — installazione sul telefono
- `sw.js` — funzionamento offline
- `vendor/jspdf.umd.min.js` — creazione PDF (jsPDF, licenza MIT)
- `fonts/` — font Barlow (SIL Open Font License)

## Codice di accesso
All'apertura l'app chiede un codice (non distingue maiuscole e minuscole). Una volta inserito,
resta memorizzato su quel dispositivo. Nel file `index.html` il codice non c'è in chiaro:
c'è solo la sua impronta cifrata (`const ACCESS = "..."`).

Per cambiarlo, dal Terminale del Mac (sostituisci NUOVOCODICE, in maiuscolo):

    printf 'racecourse:NUOVOCODICE' | shasum -a 256

Copia la sequenza di lettere e numeri che compare, incollala al posto di quella in
`const ACCESS = "..."` dentro `index.html`, carica il file e aumenta la versione in `sw.js`.
Chi aveva il vecchio codice dovrà inserire quello nuovo.

Nota: è un blocco per tenere lontani i curiosi, non una protezione forte. I dati inseriti
non sono comunque mai online: restano sul dispositivo di chi li usa.
