import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import pool from "../../../../lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      if (!user.email.endsWith("@rvce.edu.in")) return false;

      try {
        const cleanEmail = user.email.trim().toLowerCase();
        const res = await pool.query(
          'SELECT * FROM students WHERE LOWER(TRIM("College email-id")) = $1',
          [cleanEmail]
        );
        if (res.rows.length === 0) return false;
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    async session({ session }) {
      try {
        const email = session?.user?.email?.trim().toLowerCase();
        if (!email) return session;

        const res = await pool.query(
          'SELECT * FROM students WHERE LOWER(TRIM("College email-id")) = $1',
          [email]
        );

        if (res.rows.length > 0) {
          const student = res.rows[0];
          Object.assign(session.user as any, {
            usn: student["USN"],
            name: student["Name"] ?? session.user?.name,
            cgpa: student["CGPA till Current Sem"],
            branch: student["Branch"],
            tenthPercentage: student["10th percentage"],
            twelfthPercentage: student["12th/Diploma percentage"],
            activeBacklogs: student["No of active backlogs"],
            personalEmail: student["Personal email-id"],
            gender: student["Gender"],
            dob: student["Date of Birth (DD/MM/YYYY)"],
            phone: student["Mobile Number"],
            stipend: student["Stipend"],
            state: student["Native State"],
            city: student["Native City"],
            admissionQuota: student["Admission Quota(CET/COMEDK/MANAGEMENT)"],
            currentBacklogs: student["Current Backlogs(Yes/No)"],
            nptelBacklog: student["Nptel Backlog(Yes/No)"],
            aadhar: student["Aadhar Number"],
            pan: student["PAN Number"],
            internshipCompanies: student["Internship Companies"],
            collegeEmail: student["College email-id"],
            serialNumber: student["S No."]
          });
        }
        return session;
      } catch (err) {
        console.error(err);
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
