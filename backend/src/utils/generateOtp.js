const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = generateOtp;

// Math.random(): Ye 0 aur 1 ke darmiyan ek random number deta hai (e.g., 0.12345...).

// * 900000: Isay 9 lakh se multiply karne par humein 0 aur 900,000 ke darmiyan number milta hai.

// + 100000: Isay add karne se range 100,000 se 999,999 ho jati hai (yani hamesha 6-digit ka number milega).

// Math.floor(): Ye decimal points ko hata kar complete integer deta hai.

// .toString(): OTP ko string mein badal deta hai taake hum baad mein ise database mein save kar saken ya SMS/Email mein bhej saken.