"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

const questions = [
  {
    "id": 1,
    "question": "Welche der folgenden Herausforderungen betrifft globale Lieferkettenprobleme?",
    "options": [
      "Steigende Nachfrage nach Nachhaltigkeit",
      "Geopolitische Spannungen und COVID-19-Pandemie",
      "Konkurrenz durch neue Technologien",
      "Einführung von E-Procurement"
    ],
    "correct": 1
  },
  {
    "id": 2,
    "question": "Welcher Schritt gehört NICHT zu den fünf Phasen des Beschaffungsprozesses?",
    "options": [
      "Warenbedarfsermittlung und Sortimentsbildung",
      "Lieferantenselektion",
      "Produktlebenszyklusanalyse",
      "Lieferantenbeurteilung"
    ],
    "correct": 2
  },
  {
    "id": 3,
    "question": "Was beschreibt die Rolle eines Category-Managers am besten?",
    "options": [
      "Durchführung von Marktforschung und Logistikanalysen",
      "Verantwortung für Einkauf und Rentabilität einer Warengruppe",
      "Verwaltung von Produktionsprozessen im Unternehmen",
      "Überwachung der rechtlichen Anforderungen in der Beschaffung"
    ],
    "correct": 1
  },
  {
    "id": 4,
    "question": "Welche Kategorie im Beschaffungsportfolio erfordert langfristige Partnerschaften?",
    "options": [
      "Standardsortiment",
      "Strategisches Sortiment",
      "Schlüsselsortiment",
      "Engpasssortiment"
    ],
    "correct": 1
  },
  {
    "id": 5,
    "question": "Was ist ein Vorteil von E-Procurement?",
    "options": [
      "Höhere Papierkosten",
      "Verlängerte Einkaufszyklen",
      "Reduktion der Prozesskosten um 25-60 %",
      "Komplexere Bestellabwicklung"
    ],
    "correct": 2
  },
  {
    "id": 6,
    "question": "Welche Phase im Beschaffungsprozess bezieht sich auf die Analyse der Lieferpünktlichkeit?",
    "options": [
      "Warenbedarfsermittlung",
      "Lieferantensuche",
      "Lieferantenbeurteilung",
      "Bestellung"
    ],
    "correct": 2
  },
  {
    "id": 7,
    "question": "Was bedeutet der Begriff „Optimale Bestellmenge“ im Beschaffungsprozess?",
    "options": [
      "Bestellung der maximal möglichen Menge",
      "Reduktion der Lagerkosten durch kleinere Mengen",
      "Sicherstellung ausreichender Bestände bis zur nächsten Lieferung",
      "Planung von Sonderbestellungen"
    ],
    "correct": 2
  },
  {
    "id": 8,
    "question": "Welcher Vorteil wird durch die XYZ-Analyse erzielt?",
    "options": [
      "Reduzierung der Lieferkosten",
      "Optimierung der Lagerhaltung und Verbrauchsvorhersage",
      "Maximierung der Verkaufszahlen durch bessere Preisgestaltung",
      "Verbesserung der Beziehungen zu Lieferanten"
    ],
    "correct": 1
  },
  {
    "id": 9,
    "question": "Was gehört zu den Herausforderungen der Nachhaltigkeit in der Beschaffung?",
    "options": [
      "Einführung digitaler Technologien",
      "Erhöhung von Investitionen in Künstliche Intelligenz",
      "Strengere Umweltvorschriften und nachhaltige Lieferketten",
      "Globale Konkurrenz durch niedrige Preise"
    ],
    "correct": 2
  },
  {
    "id": 10,
    "question": "Welches Merkmal ist typisch für Basisartikel?",
    "options": [
      "Stark schwankende Nachfrage",
      "Saisonale Bedeutung",
      "Konstante Nachfrage und gleichmäßige Beschaffung",
      "Hohe Attraktivität, aber kurze Lebensdauer"
    ],
    "correct": 2
  },
  {
    "id": 11,
    "question": "Welche Phase des Beschaffungsprozesses ist besonders wichtig für neue Produkte?",
    "options": [
      "Bestellung",
      "Warenbedarfsermittlung und Sortimentsbildung",
      "Lieferantenbeurteilung",
      "Lieferantensuche"
    ],
    "correct": 1
  },
  
    {
      "id": 12,
      "question": "Was ist ein Nachteil der ABC-Analyse?",
      "options": [
        "Sie berücksichtigt keine qualitativen Faktoren",
        "Sie ist zu komplex für kleine Unternehmen",
        "Sie fokussiert sich auf emotionale Kriterien",
        "Sie benötigt keine genauen Daten"
      ],
      "correct": 0
    },
    {
      "id": 13,
      "question": "Welcher Faktor hat den stärksten Einfluss auf die Beschaffung von Trendartikeln?",
      "options": [
        "Stabile Nachfrage",
        "Geringe Produktionskosten",
        "Schnelle Reaktion auf Marktveränderungen",
        "Längere Planungszyklen"
      ],
      "correct": 2
    },
    {
      "id": 14,
      "question": "Was beschreibt den Bullwhip-Effekt am besten?",
      "options": [
        "Konsistenz in Lieferantenbeziehungen",
        "Schwankungen in der Nachfrage durch fehlerhafte Planung",
        "Einführung neuer Technologien in der Beschaffung",
        "Globale Lieferkettenoptimierung"
      ],
      "correct": 1
    },
    {
      "id": 15,
      "question": "Welche Phase im Produktlebenszyklus hat den höchsten Absatz?",
      "options": [
        "Einführung",
        "Wachstum",
        "Reife",
        "Sättigung"
      ],
      "correct": 2
    },
    {
      "id": 16,
      "question": "Welche Kategorie im Beschaffungsportfolio ist besonders für saisonale Produkte geeignet?",
      "options": [
        "Strategisches Sortiment",
        "Standardsortiment",
        "Engpasssortiment",
        "Schlüsselsortiment"
      ],
      "correct": 2
    },
    {
      "id": 17,
      "question": "Welcher Begriff ist im Category Management am wichtigsten?",
      "options": [
        "Warengruppe",
        "Lieferantenbeurteilung",
        "Lageroptimierung",
        "Preisverhandlungen"
      ],
      "correct": 0
    },
    {
      "id": 18,
      "question": "Welche Aufgabe gehört NICHT zu den Verantwortlichkeiten eines Category-Managers?",
      "options": [
        "Festlegen von Preisen innerhalb der Kategorie",
        "Organisation von Marketingaktionen",
        "Entwicklung neuer Produkte",
        "Auswahl des Produkt-Mixes"
      ],
      "correct": 2
    },
    {
      "id": 19,
      "question": "Welcher Vorteil ergibt sich aus der Nutzung von Planungsinstrumenten im Einkauf?",
      "options": [
        "Höhere Verkaufszahlen durch innovative Produkte",
        "Vermeidung von Überbeständen und Verlusten",
        "Verbesserung der internen Kommunikation",
        "Langfristige Reduktion der Fixkosten"
      ],
      "correct": 1
    },
    {
      "id": 20,
      "question": "Welche Aussage beschreibt X-Produkte in der XYZ-Analyse?",
      "options": [
        "Sie haben einen stabilen und gut prognostizierbaren Bedarf",
        "Ihre Nachfrage schwankt saisonal",
        "Sie sind schwer vorhersagbar",
        "Sie erfordern flexible Lagerhaltung"
      ],
      "correct": 0
    },
    
      {
        "id": 21,
        "question": "Welche Herausforderung hat die Einführung von Blockchain-Technologie in der Beschaffung?",
        "options": [
          "Hohe Implementierungskosten und spezielles Fachwissen",
          "Erhöhter Wettbewerb zwischen Lieferanten",
          "Verlängerte Lieferkettenprozesse",
          "Reduzierte Transparenz in der Lieferkette"
        ],
        "correct": 0
      },
      {
        "id": 22,
        "question": "Welcher Vorteil hat das Beschaffungsportfolio für Unternehmen?",
        "options": [
          "Minimierung aller Produktionskosten",
          "Unterstützung bei der Priorisierung strategischer Sortimente",
          "Schnellere Einführung neuer Produkte",
          "Direkte Reduktion von Lagerkosten"
        ],
        "correct": 1
      },
      {
        "id": 23,
        "question": "Was ist ein Hauptziel der Lieferantenbeurteilung?",
        "options": [
          "Analyse von Marktchancen",
          "Optimierung der zukünftigen Zusammenarbeit",
          "Einführung neuer Technologien",
          "Reduktion der Produktionszeit"
        ],
        "correct": 0
      },
      {
        "id": 24,
        "question": "Was bedeutet eine hohe Verfügbarkeit eines Produktes im Lager?",
        "options": [
          "Das Produkt wird nicht nachgefragt",
          "Es gibt keine Regallücken",
          "Es werden keine Bestellungen aufgegeben",
          "Die Lagerkosten werden minimiert"
        ],
        "correct": 1
      },
      {
        "id": 25,
        "question": "Welche Phase des Beschaffungsprozesses fokussiert sich auf Preisverhandlungen?",
        "options": [
          "Lieferantensuche",
          "Lieferantenselektion",
          "Bestellung",
          "Lieferantenbeurteilung"
        ],
        "correct": 1
      },
      {
        "id": 26,
        "question": "Welche Produkte sollten laut BCG-Matrix abgeschöpft werden?",
        "options": [
          "Stars",
          "Question Marks",
          "Cash Cows",
          "Poor Dogs"
        ],
        "correct": 2
      },
      {
        "id": 27,
        "question": "Was ist ein Hauptziel der ECR-Strategie?",
        "options": [
          "Verbesserung der Effizienz durch Zusammenarbeit",
          "Einführung nachhaltiger Produktionsmethoden",
          "Reduktion von Personalbedarf",
          "Erweiterung des Produktportfolios"
        ],
        "correct": 0
      },
      {
        "id": 28,
        "question": "Welche Warengruppe wird am stärksten durch Schwankungen beeinflusst?",
        "options": [
          "Basisartikel",
          "Trendartikel",
          "Standardsortiment",
          "Engpasssortiment"
        ],
        "correct": 3
      },
      {
        "id": 29,
        "question": "Was bedeutet „kritischer Warenbestand“?",
        "options": [
          "Maximaler Lagerbestand zur Vermeidung von Verlusten",
          "Bestand, bei dem Nachlieferungen rechtzeitig ankommen müssen",
          "Lagerung von überschüssigen Waren",
          "Reduktion der Bestellmengen"
        ],
        "correct": 1
      },
      {
        "id": 30,
        "question": "Welche Herausforderung betrifft hauptsächlich die Beschaffung neuer Produkte?",
        "options": [
          "Stabile Nachfrageprognosen",
          "Unvorhersehbare Marktentwicklung",
          "Geringe Lagerkosten",
          "Maximale Verfügbarkeit"
        ],
        "correct": 1
      },
      
        {
          "id": 31,
          "question": "Was ist ein Ziel der Multiattributbewertung in der Lieferantenbeurteilung?",
          "options": [
            "Förderung von Lieferantenpartnerschaften",
            "Reduktion der Produktionszeiten",
            "Analyse von Stärken und Schwächen der Lieferanten",
            "Einführung neuer Technologien"
          ],
          "correct": 2
        },
        {
          "id": 32,
          "question": "Welche Phase des Beschaffungsprozesses betrifft die Festlegung der bestellten Menge?",
          "options": [
            "Warenbedarfsermittlung",
            "Bestellung",
            "Lieferantenselektion",
            "Lieferantenbeurteilung"
          ],
          "correct": 1
        },
        {
          "id": 33,
          "question": "Was beschreibt die Einführung eines Produkts im Lebenszyklus am besten?",
          "options": [
            "Niedrige Kosten, maximaler Absatz",
            "Hohe Kosten, niedriger Absatz",
            "Stabile Gewinnentwicklung",
            "Starke Preissenkung"
          ],
          "correct": 1
        },
        {
          "id": 34,
          "question": "Welche Rolle spielt das Warenwirtschaftssystem im Category Management?",
          "options": [
            "Erhöhung der Lagerkosten",
            "Unterstützung bei der Datenanalyse und Bestellprognosen",
            "Durchführung von Preisverhandlungen",
            "Einführung neuer Technologien"
          ],
          "correct": 1
        },
        {
          "id": 35,
          "question": "Was ist ein Merkmal von C-Gütern in der ABC-Analyse?",
          "options": [
            "Sie erfordern hohe Lagerbestände",
            "Sie generieren 70 % des Umsatzes",
            "Ihre Bedeutung ist geringer als die von A- und B-Gütern",
            "Sie sind immer saisonale Artikel"
          ],
          "correct": 2
        },
        {
          "id": 36,
          "question": "Welche Produkte erfordern Just-in-Time-Lieferungen?",
          "options": [
            "Y-Produkte",
            "X-Produkte",
            "Z-Produkte",
            "Engpassprodukte"
          ],
          "correct": 1
        },
        {
          "id": 37,
          "question": "Welche Aufgabe gehört zur strategischen Beschaffung?",
          "options": [
            "Entwicklung neuer Produkte",
            "Auswahl geeigneter Lieferanten",
            "Optimierung der Transportkosten",
            "Lagerhaltung von Engpassprodukten"
          ],
          "correct": 1
        },
        {
          "id": 38,
          "question": "Was ist das Hauptziel der Optimierung der Warenbestände?",
          "options": [
            "Maximierung der Lagerkosten",
            "Sicherstellung der Produktverfügbarkeit bei minimalem Bestand",
            "Einführung neuer Produkte in das Sortiment",
            "Verbesserung der Marktanteile"
          ],
          "correct": 1
        },
        {
          "id": 39,
          "question": "Welche Produkte in der BCG-Matrix erfordern die höchste Investition?",
          "options": [
            "Stars",
            "Question Marks",
            "Cash Cows",
            "Poor Dogs"
          ],
          "correct": 0
        },
        {
          "id": 40,
          "question": "Was ist ein Vorteil der Portfolioanalyse?",
          "options": [
            "Sie verbessert die Lagerhaltungskosten direkt",
            "Sie hilft, strategisch wichtige Produkte zu identifizieren",
            "Sie ersetzt die Lieferantenbewertung",
            "Sie erhöht die Anzahl der verfügbaren Produkte"
          ],
          "correct": 1
        },
          {
            "id": 41,
            "question": "Welcher Faktor ist entscheidend für die Nachfrage von Saisonartikeln?",
            "options": [
              "Stabile Marktbedingungen",
              "Wetter und äußere Einflüsse",
              "Geringe Lagerbestände",
              "Hohe Werbeausgaben"
            ],
            "correct": 1
          },
          {
            "id": 42,
            "question": "Was ist eine Voraussetzung für erfolgreiches Category Management?",
            "options": [
              "Partnerschaft und Vertrauen zwischen Handel und Hersteller",
              "Einführung digitaler Prozesse",
              "Erhöhung der Lagerkosten",
              "Reduktion des Produktsortiments"
            ],
            "correct": 0
          },
          {
            "id": 43,
            "question": "Was gehört zur Rolle eines Category-Managers?",
            "options": [
              "Entwicklung von Logistikstrategien",
              "Organisation von Verkaufsförderungsaktionen",
              "Analyse von Produktionskosten",
              "Überwachung von Lagerbeständen"
            ],
            "correct": 1
          },
          {
            "id": 44,
            "question": "Welcher Punkt gehört NICHT zu den Phasen des Beschaffungsprozesses?",
            "options": [
              "Lieferantensuche",
              "Preisgestaltung",
              "Bestellung",
              "Lieferantenbeurteilung"
            ],
            "correct": 1
          },
          {
            "id": 45,
            "question": "Was beschreibt Y-Produkte in der XYZ-Analyse am besten?",
            "options": [
              "Stabiler und gut prognostizierbarer Bedarf",
              "Schwankender Verbrauch, abhängig von äußeren Faktoren",
              "Schwer vorhersagbarer Bedarf",
              "Produkte mit extrem hohen Lagerkosten"
            ],
            "correct": 1
          },
          {
            "id": 46,
            "question": "Was ist ein Nachteil von Poor Dogs in der BCG-Matrix?",
            "options": [
              "Hohe Marktwachstumsrate",
              "Hohe Marktanteile bei niedrigen Gewinnen",
              "Geringe Profitabilität bei niedrigem Wachstum",
              "Hohe Investitionskosten"
            ],
            "correct": 2
          },
          {
            "id": 47,
            "question": "Welche Warengruppe benötigt flexible Bestellmengen?",
            "options": [
              "Basisartikel",
              "Saisonartikel",
              "Standardsortiment",
              "Engpassartikel"
            ],
            "correct": 1
          },
          {
            "id": 48,
            "question": "Welche Strategie wird für Question Marks empfohlen?",
            "options": [
              "Abschöpfung des Cashflows",
              "Investition oder Aufgabe nach Analyse",
              "Maximierung der Lagerbestände",
              "Einführung eines neuen Preismodells"
            ],
            "correct": 1
          },
          {
            "id": 49,
            "question": "Was ist ein Vorteil von E-Procurement?",
            "options": [
              "Längere Einkaufszyklen",
              "Kostensenkung durch Automatisierung",
              "Einführung manueller Prozesse",
              "Reduktion der Produktqualität"
            ],
            "correct": 1
          },
          {
            "id": 50,
            "question": "Was gehört NICHT zu den Herausforderungen in der Beschaffung?",
            "options": [
              "Globale Lieferkettenprobleme",
              "Steigende Preise und Rohstoffmangel",
              "Einführung neuer gesetzlicher Regelungen",
              "Reduktion von Logistikpartnerschaften"
            ],
            "correct": 3
          },
          {
            "id": 51,
            "question": "Welche Aufgabe hat der Beschaffungsprozess?",
            "options": [
              "Maximierung der Lagerkosten",
              "Einkauf von Produkten zu attraktiven Konditionen",
              "Einführung von Trendsortimenten",
              "Reduktion der Anzahl von Lieferanten"
            ],
            "correct": 1
          },
          {
            "id": 52,
            "question": "Was beschreibt die „Reife“-Phase eines Produkts im Lebenszyklus?",
            "options": [
              "Maximaler Absatz und stabiler Gewinn",
              "Einführung neuer Produkte",
              "Hohe Kosten und niedriger Gewinn",
              "Schneller Rückgang des Absatzes"
            ],
            "correct": 0
          },
          {
            "id": 53,
            "question": "Welche Produkte werden typischerweise in kleinen Mengen gelagert?",
            "options": [
              "X-Produkte",
              "Z-Produkte",
              "Y-Produkte",
              "Basisartikel"
            ],
            "correct": 1
          },
          {
            "id": 54,
            "question": "Was ist ein Merkmal von Schlüsselsortimenten?",
            "options": [
              "Hoher Einfluss auf das Unternehmensprofil",
              "Geringer Markterfolg und niedrige Komplexität",
              "Hohe saisonale Nachfrage",
              "Reduzierte Bedeutung im Portfolio"
            ],
            "correct": 0
          },
          {
            "id": 55,
            "question": "Was ist ein Vorteil der Multiattributbewertung?",
            "options": [
              "Einführung standardisierter Produkte",
              "Systematische Beurteilung von Lieferanten",
              "Eliminierung von Engpassprodukten",
              "Automatisierung des Einkaufsprozesses"
            ],
            "correct": 1
          },
          {
            "id": 56,
            "question": "Was ist das Ziel der Lieferantensuche?",
            "options": [
              "Auswahl weniger geeigneter Lieferanten",
              "Reduktion der Lagerbestände",
              "Identifikation von Lieferanten, die die Anforderungen erfüllen",
              "Einführung neuer Technologien"
            ],
            "correct": 2
          },
          {
            "id": 57,
            "question": "Welche Faktoren spielen bei der Lieferantenbeurteilung eine Rolle?",
            "options": [
              "Preisentwicklung und Produktverfügbarkeit",
              "Maximierung der Lagerkosten",
              "Einführung von Trendsortimenten",
              "Stabilität von Marktbedingungen"
            ],
            "correct": 0
          },
          {
            "id": 58,
            "question": "Was ist ein Ziel der ECR-Strategie?",
            "options": [
              "Einführung von Blockchain-Technologien",
              "Maximierung der Lagerkosten",
              "Entwicklung kundenorientierter Sortimente",
              "Reduktion der Anzahl von Lieferanten"
            ],
            "correct": 2
          },
          {
            "id": 59,
            "question": "Welche Warengruppe wird häufig durch Wetterbedingungen beeinflusst?",
            "options": [
              "Basisartikel",
              "Saisonartikel",
              "Standardsortiment",
              "Engpassprodukte"
            ],
            "correct": 1
          },
          {
            "id": 60,
            "question": "Was bedeutet „Just-in-Time“-Lieferung?",
            "options": [
              "Lagerung großer Mengen",
              "Lieferung direkt bei Bedarf",
              "Einführung neuer Preismodelle",
              "Erhöhung der Lagerbestände"
            ],
            "correct": 1
          },
          {
            "id": 61,
            "question": "Welche Kategorie der BCG-Matrix hat den geringsten Marktwachstumsrate?",
            "options": [
              "Stars",
              "Poor Dogs",
              "Question Marks",
              "Cash Cows"
            ],
            "correct": 1
          },
          {
            "id": 62,
            "question": "Was ist ein Merkmal von Strategischem Sortiment?",
            "options": [
              "Geringe Anforderungen an die Qualität",
              "Hoher Einfluss auf den Markterfolg",
              "Stabiler Lebenszyklus",
              "Niedrige Beschaffungskomplexität"
            ],
            "correct": 1
          },
          {
            "id": 63,
            "question": "Welche Produkte in der XYZ-Analyse erfordern flexible Lagerbestände?",
            "options": [
              "X-Produkte",
              "Z-Produkte",
              "Y-Produkte",
              "Basisartikel"
            ],
            "correct": 2
          },
          {
            "id": 64,
            "question": "Was beschreibt die „Sättigungs“-Phase eines Produktlebenszyklus?",
            "options": [
              "Höchste Kosten und niedrigster Gewinn",
              "Stagnierender Absatz und sinkender Gewinn",
              "Maximale Bekanntheit und hohe Investitionen",
              "Einführung neuer Wettbewerber"
            ],
            "correct": 1
          },
          {
            "id": 65,
            "question": "Was gehört NICHT zu den Zielen der Beschaffung?",
            "options": [
              "Optimale Kostenkontrolle",
              "Maximale Lagerhaltungskosten",
              "Sicherstellung der Produktqualität",
              "Auswahl der richtigen Lieferanten"
            ],
            "correct": 1
          },
          {
            "id": 66,
            "question": "Was ist eine Voraussetzung für E-Procurement?",
            "options": [
              "Integration eines Warenwirtschaftssystems",
              "Einführung manueller Bestellprozesse",
              "Reduktion der Lieferantenauswahl",
              "Verlängerung der Einkaufszyklen"
            ],
            "correct": 0
          },
          {
            "id": 67,
            "question": "Welche Strategie wird für Cash Cows empfohlen?",
            "options": [
              "Investieren, um die Marktposition zu halten",
              "Abschöpfung des Cashflows",
              "Einführung neuer Produkte",
              "Einstellung der Produktion"
            ],
            "correct": 1
          },
          {
            "id": 68,
            "question": "Welche Herausforderung betrifft den Klimawandel in der Beschaffung?",
            "options": [
              "Einführung von Blockchain-Technologie",
              "Reduktion von Transportemissionen",
              "Einführung neuer gesetzlicher Regelungen",
              "Stabilisierung globaler Lieferketten"
            ],
            "correct": 1
          },
          {
            "id": 69,
            "question": "Welche Produkte sind laut BCG-Matrix typischerweise unprofitabel?",
            "options": [
              "Cash Cows",
              "Stars",
              "Poor Dogs",
              "Question Marks"
            ],
            "correct": 2
          },
          {
            "id": 70,
            "question": "Was ist ein Merkmal von Basisartikeln?",
            "options": [
              "Saisonale Schwankungen",
              "Konstante Nachfrage und niedrige Lagerkosten",
              "Hohe Kosten und kurze Lebensdauer",
              "Geringe Attraktivität im Markt"
            ],
            "correct": 1
          }
        
];

export default function ControllingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleAnswer = (optionIndex) => {
    const correct = questions[currentQuestion].correct === optionIndex;
    setIsCorrect(correct);
    setCorrectAnswer(correct ? null : questions[currentQuestion].options[questions[currentQuestion].correct]);
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);

    // Подсчет баллов
    if (correct) {
      setScore(score + 1);
    }

    // Показ правильности на 2 секунды перед переходом
    setTimeout(() => {
      setIsCorrect(null);
      setCorrectAnswer(null);
      nextQuestion();
    }, 5000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Результаты теста</h2>
          <p className="text-xl mb-4">
            Правильных ответов: {score} из {questions.length}
            ({Math.round((score / questions.length) * 100)}%)
          </p>
          <Button onClick={restart} className="mt-6 bg-blue-500 hover:bg-blue-600">
            Начать заново
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <CardContent>
        <div className="text-center">
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Вопрос {currentQuestion + 1} из {questions.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6">{questions[currentQuestion].question}</h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left justify-start p-4"
                variant={answers[currentQuestion] === index ? "secondary" : "outline"}
              >
                {option}
              </Button>
            ))}
          </div>

          {isCorrect !== null && (
            <div className="mt-4">
              <p
                className={`text-xl font-bold ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {isCorrect ? "Правильно!" : "Неправильно!"}
              </p>
              {!isCorrect && (
                <p className="text-lg text-gray-700">
                  Правильный ответ: {correctAnswer}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}