import getAccountDetail from './getAccountDetail';
import { AccountModel } from './models';

const data:string = `Maybank Islamic Berhad (787435-M)
15th Floor, Tower A, Dataran Maybank, 1, Jalan Maarof, 59000 Kuala Lumpur.
IBS SUBANG JAYA
MUKA/
頁 /PAGE
: 1
: 31/05/21
: 164041234123
TARIKH PENYATA
結單日期
FAJARHAC TECHNOLOGY
JALAN JALAN CARI MAKAN
SOMEWHERE 80800
SELANGOR
STATEMENT DATE
NOMBOR AKAUN
戶號
ACCOUNT
NUMBER
PROTECTED BY PIDM UP TO RM250,000 FOR EACH DEPOSITOR
SME FIRST ACCOUNT -I
URUSNIAGA AKAUN/ 戶口進支項 /ACCOUNT TRANSACTIONS
TARIKH MASUK TARIKH NILAI BUTIR URUSNIAGA JUMLAH URUSNIAGA 進支日期 仄過賬日期 進支項說明 银碼 結單存餘
ENTRY DATE VALUE DATE TRANSACTION DESCRIPTION TRANSACTION AMOUNT STATEMENT BALANCE
BEGINNING BALANCE
TRANSFER TO A/C
NUR SOMETHING*
something
MBB CT-chicken escre
TRANSFER TO A/C
NOR SOMETHING*
chickenescream
MBB CT-
TRANSFER TO A/C
MOHD SOMETHING JUGAK*
2kg kambing me
TRANSFER TO A/C
AHMAD A*
Order Orang
Kambing Perap dll
TRANSFER TO A/C
ABU BAKAR B*
Kambing
TRANSFER TO A/C
SOMEONE*
someone-kp
MBB CT-
TRANSFER FR A/C
PEMBEKAL
*
KP
MBB CT
TRANSFER TO A/C
SOMEONE BINTI SO*
Someone
Kambing perap
TRANSFER TO A/C
MOHD SOMEONE*
payment
MBB CT-kambing perap
05/06
08/06
08/06
08/06
14/06
16/06
16/06
25/06
31/06
BAKI LEGAR = BAKI AKHIR - CEK BELUM JELAS
可應用存餘 = 截止結餘減未過賬仄
=
LEDGER
ENDING BALANCE - UNCLEARED CHEQUES
BALANCE
Perhatian / Note
(1) Semua maklumat dan baki yang dinyatakan di sini akan dianggap betul
melainkan Bank telah dimaklumkan secara bertulis tentang sebarang
ketidaktepatan dalam tempoh 21 hari.
若银行在21天内未获得书面通知于任何差异，所有显示的账项及
余额将被视为正确。
(2)
All items and balances shown will be considered correct unless the Bank is
notified in writing of any discrepancies within 21 days.
Sila beritahu kami sebarang pertukaran alamat secara bertulis.
請通知本行在何地址更换。
Please notify us of any change of address in writing.
BAKI PENYATA
123.00+ 601.50
724.50
77.00+ 801.50
85.00+ 886.50
178.00+ 1,064.50
150.00+ 1,214.50
350.00+ 1,564.50
1,000.00- 564.50
1,130.00+ 1,694.50
350.00+ 2,044.50
Wang yang keluar berlebihan
ditandakan dengan DR
本欄内誌DR者爲結欠
Overdrawn balances are
denoted by DR
PROTECTED BY PIDM UP TO RM250,000 FOR EACH DEPOSITOR*
NOT PROTECTED BY PIDM
*Applicable for PA-i minor and in-trust only.Maybank Islamic Berhad (787435-M)
15th Floor, Tower A, Dataran Maybank, 1, Jalan Maarof, 59000 Kuala Lumpur.
IBS SUBANG JAYA
MUKA/
頁 /PAGE
: 2
: 31/05/21
: 164041234123
TARIKH PENYATA
結單日期
FAJARHAC TECHNOLOGY
JALAN JALAN CARI MAKAN
SOMEWHERE 80800
SELANGOR
STATEMENT DATE
NOMBOR AKAUN
戶號
ACCOUNT
NUMBER
PROTECTED BY PIDM UP TO RM250,000 FOR EACH DEPOSITOR
SME FIRST ACCOUNT -I
URUSNIAGA AKAUN/ 戶口進支項 /ACCOUNT TRANSACTIONS
TARIKH MASUK TARIKH NILAI BUTIR URUSNIAGA JUMLAH URUSNIAGA 進支日期 仄過賬日期 進支項說明 银碼
BAKI PENYATA
結單存餘
ENTRY DATE VALUE DATE TRANSACTION DESCRIPTION TRANSACTION AMOUNT STATEMENT BALANCE
ENDING BALANCE :
LEDGER BALANCE : 2,044.50
2,044.50
TOTAL DEBIT :
TOTAL CREDIT :
PROFIT OUTSTANDING 1,000.00
2,443.00
.00
KIJANG EMAS
KIJANG EMAS, MALAYSIA'S OWN GOLD BULLION COIN IS AVAILABLE FOR
PURCHASE IN VARIOUS DENOMINATION OF 1 OZ, 1/2 OZ AND 1/4 OZ.
VISIT ANY OF OUR NEAREST 31 PARTICIPATING BRANCHES OR VISIT
WWW.MAYBANK.COM.MY FOR MORE INFO.
.
M2U BIZ
MAYBANK2U BIZ IS NOW EVEN MORE COMPACT WITH THE NEW BULK PAYMENT
FEATURE! LOGIN TO MAYBANK2U BIZ TO DISCOVER MORE. NOT A USER
YET? VISIT THE NEAREST MAYBANK BRANCH FOR MORE INFO.
TERMS AND CONDITIONS APPLY.
.
FCN
EXCHANGE YOUR CURRENCY AT COMPETITIVE RATES WITH US. NO HIDDEN
CHARGES! VISIT THE NEAREST MAYBANK MONEY EXCHANGE BOOTH TODAY.
VISIT WWW.MAYBANK.COM.MY FOR MORE INFO.
.
EFFECTIVE 11 JULY 2020, MAYBANK2U BIZ CUSTOMERS WILL BE ABLE TO
PAY STATUTORY CONTRIBUTIONS FOR EMPLOYEES ONLINE VIA MAYBANK2U BIZ.
THIS INCLUDES PAYMENTS TO KWSP(EPF), LHDN, PERKESO(FOR SOCSO) AND
EIS. LOG IN TO MAYBANK2U BIZ NOW.
.
MULAI 11 JULAI 2020, PELANGGAN MAYBANK2U BIZ BOLEH MEMBUAT CARUMAN
BAKI LEGAR = BAKI AKHIR - CEK BELUM JELAS
可應用存餘 = 截止結餘減未過賬仄
=
LEDGER
ENDING BALANCE - UNCLEARED CHEQUES
BALANCE
Perhatian / Note
(1) Semua maklumat dan baki yang dinyatakan di sini akan dianggap betul
melainkan Bank telah dimaklumkan secara bertulis tentang sebarang
ketidaktepatan dalam tempoh 21 hari.
若银行在21天内未获得书面通知于任何差异，所有显示的账项及
余额将被视为正确。
(2)
All items and balances shown will be considered correct unless the Bank is
notified in writing of any discrepancies within 21 days.
Sila beritahu kami sebarang pertukaran alamat secara bertulis.
請通知本行在何地址更换。
Please notify us of any change of address in writing.
Wang yang keluar berlebihan
ditandakan dengan DR
本欄内誌DR者爲結欠
Overdrawn balances are
denoted by DR
PROTECTED BY PIDM UP TO RM250,000 FOR EACH DEPOSITOR*
NOT PROTECTED BY PIDM
*Applicable for PA-i minor and in-trust only.Maybank Islamic Berhad (787435-M)
15th Floor, Tower A, Dataran Maybank, 1, Jalan Maarof, 59000 Kuala Lumpur.
IBS SUBANG JAYA
MUKA/
頁 /PAGE
: 3
: 31/05/21
: 164041234123
TARIKH PENYATA
結單日期
FAJARHAC TECHNOLOGY
JALAN JALAN CARI MAKAN
SOMEWHERE 80800
SELANGOR
STATEMENT DATE
NOMBOR AKAUN
戶號
ACCOUNT
NUMBER
PROTECTED BY PIDM UP TO RM250,000 FOR EACH DEPOSITOR
SME FIRST ACCOUNT -I
URUSNIAGA AKAUN/ 戶口進支項 /ACCOUNT TRANSACTIONS
TARIKH MASUK TARIKH NILAI BUTIR URUSNIAGA JUMLAH URUSNIAGA 進支日期 仄過賬日期 進支項說明 银碼
BAKI PENYATA
結單存餘
ENTRY DATE VALUE DATE TRANSACTION DESCRIPTION TRANSACTION AMOUNT STATEMENT BALANCE
KEPADA BADAN-BADAN BERKANUN UNTUK PEKERJA SECARA DALAM TALIAN MELALUI
MAYBANK2U BIZ. INI TERMASUK BAYARAN CARUMAN KEPADA KWSP, LHDN, PERKESO
DAN EIS. LOG MASUK KE MAYBANK2U BIZ SEKARANG.
.
BANK NEGARA MALAYSIA (BNM) HAS DISCONTINUED ITS DCHEQS SYSTEM WHICH
CAPTURES DISHONOURED CHEQUES INCIDENCES & TRACKS BAD CHEQUE OFFENDERS
ON 30/09/20. WITH EFFECT FROM 01/10/20, ALL REFERENCES TO BNM'S
DCHEQS SYSTEM IN OUT T&CS WILL REFER TO THE SUBSTITUTED DCHEQS
SYSTEM IMPLEMENTED BY MAYBANK.
PLEASE CONTACT HOME BRANCH FOR FURTHER CLARIFICATIONS.
.
PLEASE BE REMINDED TO CHECK YOUR BANK ACCOUNT BALANCES REGULARLY
VIA MAYBANK2U, MAYBANK2U APP, MAE APP OR MAYBANK2U BIZ AND BE
INFORMED OF YOUR DAILY FINANCIAL ACTIVITIES.
.
SHOULD YOU REQUIRE TO PERFORM HIGH VOLUME FUND TRANSFERS, PLEASE
DO KNOW THAT THE BULK PAYMENT FEATURE IN M2U BIZ HAS A TRANSFER
LIMIT OF RM250,000 PER TRANSACTION!
.
BAKI LEGAR = BAKI AKHIR - CEK BELUM JELAS
可應用存餘 = 截止結餘減未過賬仄
=
LEDGER
ENDING BALANCE - UNCLEARED CHEQUES
BALANCE
Perhatian / Note
(1) Semua maklumat dan baki yang dinyatakan di sini akan dianggap betul
melainkan Bank telah dimaklumkan secara bertulis tentang sebarang
ketidaktepatan dalam tempoh 21 hari.
若银行在21天内未获得书面通知于任何差异，所有显示的账项及
余额将被视为正确。
(2)
All items and balances shown will be considered correct unless the Bank is
notified in writing of any discrepancies within 21 days.
Sila beritahu kami sebarang pertukaran alamat secara bertulis.
請通知本行在何地址更换。
Please notify us of any change of address in writing.
Wang yang keluar berlebihan
ditandakan dengan DR
本欄内誌DR者爲結欠
Overdrawn balances are
denoted by DR
PROTECTED BY PIDM UP TO RM250,000 FOR EACH DEPOSITOR*
NOT PROTECTED BY PIDM
*Applicable for PA-i minor and in-trust only.
`;

test('should return correct account detail', () => {
  const fileContentsLineByLine: string[] = data.split(/\r?\n/);
  const account: AccountModel = getAccountDetail(fileContentsLineByLine);
  expect(account.bank?.number).toContain('164041234123');
  expect(account.bank?.name).toBe('Maybank');
  expect(account.name.toLowerCase()).toBe('fajarhac technology');
});
