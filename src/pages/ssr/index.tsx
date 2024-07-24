import { useState } from "react";
import { useRouter } from "next/router";
import AvatarCard from "@/components/AvatarCard/AvatarCard";
import AddAvatarButton from "@/components/AddAvatarButton/AddAvatarButton";
import Footer from "@/components/Footer/Footer";
import { fetchAvatars, fetchSingleAvatar } from "@/services/avatars";
import styles from "../../styles/App.module.css";

interface SsrPageProps {
  initialAvatars: string[];
}

export async function getServerSideProps() {
  try {
    const initialAvatars = await fetchAvatars(5); //get first 5 avatars
    return {
      props: {
        initialAvatars,
      },
    };
  } catch (error) {
    console.error("Error fetching avatars:", error);
    return {
      props: {
        initialAvatars: [],
      },
    };
  }
}

export default function SsrPage({ initialAvatars = [] }: SsrPageProps) {
  const [avatars, setAvatars] = useState<string[]>(initialAvatars);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addAvatar = async () => {
    try {
      const avatarUrl = await fetchSingleAvatar();
      if (avatarUrl) {
        setAvatars((prevAvatars) => [...prevAvatars, avatarUrl]);
      } else {
        alert("Could not fetch a valid avatar.");
      }
    } catch (error) {
      alert("Error while fetching avatar.");
    }
  };

  const refreshAvatar = async (index: number) => {
    console.log(index);
    try {
      const avatarUrl = await fetchSingleAvatar();
      console.log("avatarurl", avatarUrl);
      if (avatarUrl) {
        setAvatars((prevAvatars) => {
          const newAvatars = [...prevAvatars];
          newAvatars[index] = avatarUrl;
          return newAvatars;
        });
      } else {
        alert("Could not fetch a valid avatar.");
      }
    } catch (error) {
      alert("Error while fetching avatar.");
    }
  };

  const refreshAllAvatars = async () => {
    setLoading(true);
    try {
      const newAvatars = await Promise.all(
        avatars.map(async () => {
          try {
            const avatarUrl = await fetchSingleAvatar();
            return avatarUrl || "";
          } catch {
            console.error("Error fetching avatar");
            return "";
          }
        })
      );
      setAvatars(newAvatars.filter((url) => url !== ""));
    } catch (error) {
      alert("Error updating avatars.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <main>
        <h1 className="text-4xl font-bold text-center">
          Avatars Gallery using Server Side Rendering
        </h1>
        <div className={styles.App}>
          <div className={styles.avatarGridContainer}>
            <div className={styles.avatarGrid}>
              {avatars.map((avatar, index) => (
                <AvatarCard
                  key={index}
                  url={avatar}
                  onRefresh={() => refreshAvatar(index)}
                />
              ))}
              <AddAvatarButton onAdd={addAvatar} />
            </div>
          </div>
          <Footer
            onRefreshAll={refreshAllAvatars}
            loading={loading}
            ariaLabel="Refresh All Avatars"
            onGoBack={handleGoBack}
          />
        </div>
      </main>
    </>
  );
}
