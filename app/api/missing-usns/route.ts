import { NextResponse } from "next/server";
import pool from "../../../lib/db";

const EXPECTED_STUDENTS = [
    { usn: "1RV23AI001", name: "AADITEY CHALVA" },
    { usn: "1RV23AI002", name: "AANISH KHAN" },
    { usn: "1RV23AI004", name: "ABHILASH MAIYA Y" },
    { usn: "1RV23AI005", name: "ADHEESH MUDGAL" },
    { usn: "1RV23AI006", name: "ADITHYA ACHARYA U" },
    { usn: "1RV23AI007", name: "ADITYA KAUSHIK" },
    { usn: "1RV23AI008", name: "ADITYA RANJAN" },
    { usn: "1RV23AI009", name: "ADITYA TRIPATHI" },
    { usn: "1RV23AI010", name: "AFFAN YASIR" },
    { usn: "1RV23AI011", name: "AHIBHRUTH A" },
    { usn: "1RV23AI012", name: "ALROY DEON SALDANHA" },
    { usn: "1RV23AI013", name: "AMOGH A P" },
    { usn: "1RV23AI014", name: "AMUDHAN S" },
    { usn: "1RV23AI016", name: "ANIKA VIDYA RAGHAV" },
    { usn: "1RV23AI017", name: "ANIKET RT" },
    { usn: "1RV23AI018", name: "ANJALI SURESH KALARIKKAL" },
    { usn: "1RV23AI019", name: "ANUPAMA" },
    { usn: "1RV23AI020", name: "APOORVA KRISHNA P" },
    { usn: "1RV23AI021", name: "ARINDAM GUPTA" },
    { usn: "1RV23AI022", name: "ASHISH R BIRADAR" },
    { usn: "1RV23AI023", name: "B VINAYAKA AILI" },
    { usn: "1RV23AI024", name: "BALLUPET PRAKASH MONAL" },
    { usn: "1RV23AI026", name: "BHEEMARAJ DODDAMANI" },
    { usn: "1RV23AI027", name: "BIRADAR ABHISHEK MALLIKARJUN" },
    { usn: "1RV23AI028", name: "DAKSH CHAUHAN" },
    { usn: "1RV23AI029", name: "DHAKSHA MUTHUKUMARAN" },
    { usn: "1RV23AI031", name: "DHANUSH R MOOLEMANE" },
    { usn: "1RV23AI032", name: "DHRUV PATANKAR" },
    { usn: "1RV23AI033", name: "DIPTANSHU KUMAR" },
    { usn: "1RV23AI034", name: "GARV AGARWALLA" },
    { usn: "1RV23AI035", name: "GNANENDRA NAIDU N" },
    { usn: "1RV23AI036", name: "HARSH AGRAWAL" },
    { usn: "1RV23AI037", name: "HEMA UMESH HEGDE" },
    { usn: "1RV23AI040", name: "JOSEPH REJO MATHEW" },
    { usn: "1RV23AI041", name: "JUNED BABA D HUNASHIMARAD" },
    { usn: "1RV23AI042", name: "KS SHAMITH RAJ" },
    { usn: "1RV23AI043", name: "KARNATI LAKSHMI SREE" },
    { usn: "1RV23AI044", name: "KASHISH GUPTA" },
    { usn: "1RV23AI045", name: "KAVYA JAIN" },
    { usn: "1RV23AI046", name: "KEERTHI V C" },
    { usn: "1RV23AI047", name: "KUMAR YASH" },
    { usn: "1RV23AI048", name: "KUSHAL S GOWDA" },
    { usn: "1RV23AI049", name: "MACHANI BHANU TEJA" },
    { usn: "1RV23AI050", name: "MAHESHKUMAR" },
    { usn: "1RV23AI051", name: "MANOJ" },
    { usn: "1RV23AI052", name: "MANVITH S" },
    { usn: "1RV23AI054", name: "MAYUR KUMAR KN" },
    { usn: "1RV23AI056", name: "MOHIT M" },
    { usn: "1RV23AI057", name: "MOHITH V" },
    { usn: "1RV23AI058", name: "MONIL PALAK MEHTA" },
    { usn: "1RV23AI059", name: "MOWIN S" },
    { usn: "1RV23AI060", name: "MYLAVARAM PHANIKUMAR SAHASRA" },
    { usn: "1RV23AI061", name: "N MOHAMMED AKHIL" },
    { usn: "1RV23AI062", name: "N YAMINI" },
    { usn: "1RV23AI063", name: "NANDINI C" },
    { usn: "1RV23AI064", name: "NANDINI R ARAVINDAKSHAN" },
    { usn: "1RV23AI066", name: "NEELAM J" },
    { usn: "1RV23AI067", name: "NIRANJAN S KAITHOTA" },
    { usn: "1RV23AI068", name: "NISHAN U SHETTY" },
    { usn: "1RV23AI069", name: "NISHTA N SHETTY" },
    { usn: "1RV23AI071", name: "NITYA SHARMA" },
    { usn: "1RV23AI072", name: "PENCHALA HIMASHREE PERUMALLA" },
    { usn: "1RV23AI073", name: "PRATHAM M MALLYA" },
    { usn: "1RV23AI074", name: "PREETHAM BANETI" },
    { usn: "1RV23AI075", name: "PREETHAM R" },
    { usn: "1RV23AI076", name: "PRIYANSH ABHISHEK PODDAR" },
    { usn: "1RV23AI077", name: "R DAKSHARANI" },
    { usn: "1RV23AI078", name: "RAGHAVI U BALER" },
    { usn: "1RV23AI079", name: "RAMITAKA" },
    { usn: "1RV23AI080", name: "RAVI KISHAN KUMAR" },
    { usn: "1RV23AI081", name: "RAYALA YUVARAJ VAISHNAV" },
    { usn: "1RV23AI082", name: "RUSHIL SHODAVARAM" },
    { usn: "1RV23AI083", name: "S VISHWANATHA" },
    { usn: "1RV23AI084", name: "SACHIT RAMESHA GOWDA" },
    { usn: "1RV23AI085", name: "SAMRUDDHI D" },
    { usn: "1RV23AI086", name: "SANKALP KHAMESRA" },
    { usn: "1RV23AI087", name: "SASANK SEKHAR PANDA" },
    { usn: "1RV23AI088", name: "SHALINI P" },
    { usn: "1RV23AI089", name: "SHANAVI NARAYAN" },
    { usn: "1RV23AI090", name: "SHANTHESH A S" },
    { usn: "1RV23AI091", name: "SHASHANK KRISHNAMANI" },
    { usn: "1RV23AI092", name: "SHAURYA SINGH" },
    { usn: "1RV23AI093", name: "SHRAVYAA S" },
    { usn: "1RV23AI095", name: "SHREYA MOHAN" },
    { usn: "1RV23AI096", name: "SHREYAS BHARADWAJ" },
    { usn: "1RV23AI097", name: "SHRIPOORNA BADAGANDI" },
    { usn: "1RV23AI099", name: "SHUBHADITYA BASUDEO" },
    { usn: "1RV23AI100", name: "SHUBHAM KUMAR PANDEY" },
    { usn: "1RV23AI101", name: "SIDDARTH A THOTADA" },
    { usn: "1RV23AI102", name: "SIRI KUMAR CS" },
    { usn: "1RV23AI103", name: "SOURABH R SHETTY" },
    { usn: "1RV23AI104", name: "SREEHARISHTJ" },
    { usn: "1RV23AI105", name: "SRI RAM A" },
    { usn: "1RV23AI106", name: "SRIHARI S" },
    { usn: "1RV23AI107", name: "SRUJAN R" },
    { usn: "1RV23AI108", name: "SUMITH S SHETTY" },
    { usn: "1RV23AI109", name: "SURAVI REDDY" },
    { usn: "1RV23AI110", name: "SURYA PRATAP SINGH" },
    { usn: "1RV23AI111", name: "TP MOHITH" },
    { usn: "1RV23AI112", name: "TANUJ S" },
    { usn: "1RV23AI113", name: "TEJAS ANAND" },
    { usn: "1RV23AI114", name: "THARUN GOWDA P R" },
    { usn: "1RV23AI115", name: "VAIBHAV S P" },
    { usn: "1RV23AI116", name: "VAIVASWAT VERMA" },
    { usn: "1RV23AI117", name: "VELUMURI SRIRAM KUMAR" },
    { usn: "1RV23AI118", name: "VIJAYKUMAR BK" },
    { usn: "1RV23AI119", name: "VIKAS LALWANI" },
    { usn: "1RV23AI120", name: "VINOD KUMAR" },
    { usn: "1RV23AI121", name: "YASH SHARMA" },
    { usn: "1RV23AI122", name: "YASHAS H D" },
    { usn: "1RV23AI123", name: "YASHNA BHANDARY" },
    { usn: "1RV23AI124", name: "YASHPREET GOYAL" },
    { usn: "1RV23AI125", name: "YUG SHIVHARE" },
    { usn: "1RV23AI126", name: "ZAID SHARIEFF" },
    { usn: "1RV23AI127", name: "B AISHWARYA NAYAK" },
    { usn: "1RV23AI128", name: "ATHARVA SRIVATSAVA" },
    { usn: "1RV23AI129", name: "UNMESH RAJ" },
    { usn: "1RV23AI130", name: "ADITYA K" },
    { usn: "1RV23AI131", name: "SANEHA SHARMA" },
    { usn: "1RV23AI132", name: "VINEETH RAJ" },
    { usn: "1RV23AI133", name: "PRANAV PRATYUSH" },
    { usn: "1RV23AI134", name: "PRATHAMESH" },
    { usn: "1RV23AI135", name: "ABHINAV SRINIVAS POTHARAJU" },
    { usn: "1RV23AI136", name: "B V VINITH" },
    { usn: "1RV24AI400", name: "BHIMARAO ARUN KOLI" },
    { usn: "1RV24AI402", name: "CHIRAG H" },
    { usn: "1RV24AI403", name: "HARISH APPASAB SAVALAGI" },
    { usn: "1RV24AI404", name: "IBRAHIM BAGWAN" },
    { usn: "1RV24AI405", name: "KY HEMALATHA" },
    { usn: "1RV24AI406", name: "L MORYAKANTHA" },
    { usn: "1RV24AI407", name: "MAHANTESH PARAMESHWARAYYA BAJARAMATH" },
    { usn: "1RV24AI408", name: "PREM GANESH" },
    { usn: "1RV24AI409", name: "RACHATESHWAR" },
    { usn: "1RV24AI410", name: "RAJENDRA PRASAD B S" },
    { usn: "1RV24AI411", name: "SRIKAR REDDY YETTAPU" }
];

export async function GET() {
    try {
        const res = await pool.query('SELECT "USN" FROM students');

        // Strictly normalize both sides to prevent whitespace or capitalization anomalies
        const normalizeUsn = (usn: string | undefined | null) =>
            usn ? String(usn).trim().toUpperCase() : "";

        const existingUsns = new Set(
            res.rows
                .map(row => row["USN"] || row.usn)
                .filter(Boolean)
                .map(normalizeUsn)
        );

        const missing = EXPECTED_STUDENTS.filter(s => {
            const normalized = normalizeUsn(s.usn);
            return normalized && !existingUsns.has(normalized);
        });

        return NextResponse.json({ missing, count: missing.length });
    } catch (err) {
        console.error("Failed to fetch USNs", err);
        return NextResponse.json({ error: "Failed to fetch missing USNs" }, { status: 500 });
    }
}
