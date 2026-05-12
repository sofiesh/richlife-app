# CLAUDE.md – Projektbriefing

## Om projektet
En React-app för personlig inköpshantering med fokus på inköpsbeslut.
Projektet påbörjades för ~2 år sedan och har nu återupptagits.

## Mål med appen
- Hantera inköpslistor (skapa, redigera, ta bort)
- Säker och mest moderna Identity Management. Registrering, inloggning och hantering av personuppgifter. OAuth 2.0
- För varje entry i inköpslistan lägger användaren till information och tillhandahålls även beräknade värden. Tex: Prisuppskattning nyköp vs second-hand, CO2 utsläpp vid nytillverkning, tillfört värde kopplat till prioritet (hur viktigt köpet är för personen/familjen)
- Historik: köpta varor, besparing vs möjlig besparing
- Analys av konsumtionsmönster

## Prioriteringar vid återstart
1. **Kartlägg kodbasen** – förstå vad som finns och vad som (ev.) fungerar
2. **Uppdatera beroenden** – identifiera föråldrade paket och säkerhetsrisker
3. **Städa och refaktorera** – förbättra kodkvalitet där det behövs

## Instruktioner till Claude
- Börja alltid med att läsa den här filen
- Genomför inga ändringar, ge feedback och guida.
- Flagga teknisk skuld med prioritet: hög / medel / låg
