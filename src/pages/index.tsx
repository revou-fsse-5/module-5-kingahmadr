import CategoryTab from "@/components/CategoryTab";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <Suspense fallback={<RotatingLoader />}> */}
      <CategoryTab />
      {/* </Suspense> */}
    </div>
  );
}
