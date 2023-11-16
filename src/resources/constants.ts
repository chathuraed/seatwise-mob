const cities = [
  'Achchuvley',
  'Akkaraipattu',
  'Akurana',
  'Alawwa',
  'Ambalangoda',
  'Ambalantota',
  'Ambepussa',
  'Ampara',
  'Anamaduwa',
  'Anuradhapura',
  'Arachchikattuwa',
  'Arayampathy',
  'Avarankal',
  'Avissawella',
  'Badulla',
  'Balangoda',
  'Bambalapitiya',
  'Bampalapittya',
  'Bandaragama',
  'Bandarawela',
  'Batticaloa',
  'Belummahara',
  'Bentota',
  'Beruwala',
  'Bibile',
  'Buttala',
  'Chavakacheri',
  'Chenkalady',
  'Chilaw',
  'Chillaw',
  'Chunnakam',
  'Colombo',
  'Dambulla',
  'Dayagama',
  'Debarawewa',
  'Dehiattakandiya',
  'Dickwella',
  'Digana',
  'Diyathalawa',
  'Dondra',
  'Eheliyagoda',
  'ELLA',
  'Elpitiya',
  'Eluthumadduvaal',
  'Embilipitiya',
  'Eravur',
  'Galewela',
  'Galigamuwa',
  'Galle',
  'Galle Face',
  'Galoya',
  'Gampola',
  'Gelanigama',
  'Gelioya',
  'Ginigathhena',
  'Girandurukotte',
  'Girithale',
  'Godagama',
  'Habarana',
  'Hakgala',
  'Hambantota',
  'Haputale',
  'Hatton',
  'Hendala',
  'Horana',
  'Horowupotana',
  'Hungama',
  'Hunnasgiriya',
  'Inuvil',
  'Iranaimadu',
  'Irupaalai',
  'Iyankachchi',
  'Ja-Ela',
  'Jaffna',
  'Kachcheri',
  'Kadawatha',
  'Kadugannawa',
  'Kaduruwela',
  'Kaduwela',
  'Kaithady',
  'Kallady',
  'Kalmunai',
  'Kalutara',
  'Kalviyankaadu',
  'Kamburupitiya',
  'Kanakarayankulam',
  'Kandana',
  'Kandy',
  'Kankesanthurai',
  'Kantalai',
  'Kanthalai',
  'Karainagar',
  'Karawanella',
  'Kataragama',
  'Kattankudy',
  'Katugastota',
  'Katunayake',
  'Katunayake Airport',
  'Kegalle',
  'Kelaniya',
  'Kilinochchi',
  'Kinniya',
  'Kiramakodu',
  'Kiran',
  'Kiribathgoda',
  'Kitulgala',
  'Kodikamam',
  'Kokkavil',
  'Kokkuvil',
  'Kollupitiya',
  'Kopay',
  'Kosgama',
  'Kotahena',
  'Kottawa',
  'Kumbalwela',
  'Kuncharkadai',
  'Kurunegala',
  'Lunugala',
  'Maalisanthi',
  'Maankulam',
  'Maavidapuram',
  'Mabola',
  'Madampe',
  'Madurankuli',
  'Mahabage',
  'Mahaoya',
  'Maharagama',
  'Mahiyanganaya',
  'Makumbara',
  'Mallakam',
  'Mannar',
  'Manthikai',
  'Maradana',
  'Marawila',
  'Maruthanarmadam',
  'Matale',
  'Matara',
  'Mathugama',
  'Mawanella',
  'Maweva',
  'Medagama',
  'Medawachchiya',
  'Meesalai',
  'Melsiripura',
  'Middeniya',
  'Mihintale',
  'Minneriya',
  'Minuwangoda',
  'Mirusuvil',
  'Mollipothana',
  'Monaragala',
  'Moratuwa',
  'Mukamaalai',
  'Mullaitivu',
  'Mundel',
  'Murukandy',
  'Nallur',
  'Naula',
  'Navatkuli',
  'Nawalapitiya',
  'Neerveli',
  'Negombo',
  'Nelliady',
  'Nintavur',
  'Nittambuwa',
  'Nonagama',
  'Nunavil',
  'Nuwaraeliya',
  'Oddamavadi',
  'Omanthai',
  'Padiyathalawa',
  'Palai',
  'Panadura',
  'Paranthan',
  'Passara',
  'Pasyala',
  'Peliyagoda',
  'Peliyakoda',
  'Peradeniya',
  'Periyamulla',
  'Pettah',
  'Point Pedro',
  'Polgahawela',
  'Polonnaruwa',
  'Pottuvil',
  'Puliyankulam',
  'Pulmudai',
  'Punanai',
  'Puraporukki',
  'Pussellawa',
  'Puttalam',
  'Puttur',
  'Rajagiriya',
  'Ramboada',
  'Ranna',
  'Ratnapura',
  'Saaraiyady',
  'Sammanthurai',
  'Seeduwa',
  'Senkalady',
  'Silaiyady',
  'Siruppiddy',
  'Talalla',
  'Tangalle',
  'Thaandikulam',
  'Thalawakele',
  'Thambalagamuwa',
  'Thavady',
  'Thellipalai',
  'Thihagoda',
  'Thihariya',
  'Thirukkovil',
  'Thotalanga',
  'Tissamaharama',
  'Trincomalee',
  'Tunkamaalai',
  'Udumalaipettai',
  'Udupussallawa',
  'Uduvil',
  'Urumpirai',
  'Vaddukkodai',
  'Vaharai',
  'Vakarai',
  'Valaichenai',
  'Vallai',
  'Vallvettithurai',
  'Vankalai',
  'Vavuniya',
  'Veyangalla',
  'Wadduwa',
  'Wattala',
  'Welisara',
  'Wellawaya',
  'Wellawatte',
  'Weliweriya',
  'Wennappuwa',
  'Werahera',
  'Wetakeiya',
  'Wetakeiyawa',
  'Wattegama',
  'Wattella',
  'Watteyaya',
  'Watteyaya Kirulapana',
  'Watteyaya Nugegoda',
  'Weval',
  'Wijayapura',
  'Yahalawatta',
  'Yala',
  'Yalkada',
  'Yalppanam',
  'Yatiyantota',
  'Yirangalla',
];

export {cities};
