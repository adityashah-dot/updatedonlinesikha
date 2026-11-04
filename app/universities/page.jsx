"use client";
import TopCollegesByLocation from "../src/components/TopCollegesByLocation";
import UniversityList from "../src/components/UniversityList";

export default function UniversitiesPage() {
  return (
    <main>
      <h1>Explore Top UGC-DEB Approved Online Universities in India</h1>
      <TopCollegesByLocation />
      <UniversityList all={[]} />
    </main>
  );
}
