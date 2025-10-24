import { useAuth } from "@/hooks/useAuth";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <main className="pb-8 md:pb-12 lg:pb-24">
      <h1 className="bg-green-700 py-6 text-center text-2xl font-bold text-white lg:text-5xl">
        Your Profile
      </h1>
      <div className="mx-auto mt-10 max-w-2xl rounded-md border p-4 py-8 shadow md:py-12 lg:py-16">
        <div className="border-b p-4">
          <p className="text-muted-foreground mb-1 text-sm">Name</p>
          <h2>{user?.name}</h2>
        </div>
        <div className="border-b p-4">
          <p className="text-muted-foreground mb-1 text-sm">Email</p>
          <h2>{user?.email}</h2>
        </div>
        <div className="border-b p-4">
          <p className="text-muted-foreground mb-1 text-sm">Phone</p>
          <h2>{user?.phone || "No phone number added"}</h2>
        </div>
        <div className="border-b p-4">
          <p className="text-muted-foreground mb-1 text-sm">Division</p>
          <h2>{user?.address?.division}</h2>
        </div>
        <div className="border-b p-4">
          <p className="text-muted-foreground mb-1 text-sm">District</p>
          <h2>{user?.address?.district}</h2>
        </div>
        <div className="border-b p-4">
          <p className="text-muted-foreground mb-1 text-sm">Sub District</p>
          <h2>{user?.address?.subDistrict}</h2>
        </div>
        <div className="border-b p-4">
          <p className="text-muted-foreground mb-1 text-sm">Zip</p>
          <h2>{user?.address?.zip}</h2>
        </div>
        <div className="p-4">
          <p className="text-muted-foreground mb-1 text-sm">Full Address</p>
          <h2>{user?.address?.streetAddress}</h2>
        </div>
      </div>

      <div className="mx-auto w-fit py-12">
        <UpdateProfile />
      </div>
    </main>
  );
};

export default Profile;
