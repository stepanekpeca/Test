# Jídelna – výroba a expedice

Statický prototyp pro potravinářský provoz. Obsahuje receptury s normativy surovin, přepočet na počet porcí, technologické postupy, výrobní příkazy, příjem a výdej skladových šarží, sklad výroby a expedici odběratelům.

## Spuštění

Otevřete `index.html` v prohlížeči nebo spusťte v adresáři projektu jednoduchý HTTP server, například:

```sh
python3 -m http.server 8000
```

Ukázková data a změny se ukládají pouze do `localStorage` aktuálního prohlížeče. Pro skutečný provoz je potřeba doplnit centrální databázi, uživatelská oprávnění a provozní validaci technologických a hygienických postupů.

## Oscar’s Barbershop — týmová agenda pro iPhone

Samostatná mobilní webová aplikace pro Oscar’s Barbershop je v adresáři `Ukoly`. Obsahuje úkoly a poznámky, přiřazení zaměstnancům, termíny, priority a stavy, místní číselník zaměstnanců, podúkoly, komentáře a historii, týdenní či měsíční opakování a kalendář. Klepnutím na úkol v přehledu se otevře podokno s jeho detailem a kontrolním seznamem. Opakovaný úkol vytvoří další výskyt po označení za hotový; zachová se zadání a podúkoly se zkopírují znovu jako nezaškrtnuté.

Data zůstávají pouze v místním úložišti aktuálního prohlížeče; mezi lidmi ani zařízeními se nesynchronizují. Komentáře jsou označeny jako „Já“, protože prototyp nemá uživatelské účty.

Spusťte webový server v kořenové složce projektu:

```sh
python3 -m http.server 8000
```

Na iPhonu otevřete v Safari adresu `http://<adresa-počítače>:8000/Ukoly/` ve stejné síti a zvolte **Sdílet → Přidat na plochu**. Pro použití mimo lokální síť nebo bezpečný offline režim je potřeba aplikaci nasadit na HTTPS hosting.

### Nasazení na GitHub Pages

Workflow `.github/workflows/deploy-ukoly.yml` při změně aplikace publikuje obsah `Ukoly` do kořene GitHub Pages. V nastavení repozitáře otevřete **Settings → Pages** a jako zdroj nasazení vyberte **GitHub Actions**. V DNS správě domény nastavte pro `ukoly` záznam CNAME na `stepanekpeca.github.io`; zachovejte soubor `Ukoly/CNAME`. Po úspěšném běhu workflow bude aplikace dostupná na `https://ukoly.stepanekapp.cz`.

Současná verze ukládá data do úložiště prohlížeče konkrétního zařízení. Nemá přihlášení ani sdílenou databázi; zaměstnanci tedy mezi sebou úkoly nesdílejí.