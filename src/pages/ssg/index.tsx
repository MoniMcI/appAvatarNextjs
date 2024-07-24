import { useState } from "react";
import { useRouter } from "next/router";
import AddAvatarButton from "@/components/AddAvatarButton/AddAvatarButton";
import AvatarCard from "@/components/AvatarCard/AvatarCard";
import Footer from "@/components/Footer/Footer";
import { fetchAvatars, fetchSingleAvatar } from "@/services/avatars";
import styles from "../../styles/App.module.css";

interface SsgPageProps {
  initialAvatars: string[];
}

export async function getStaticProps() {
  const avatars = await fetchAvatars(5); //get the first 5 avatars

  return {
    props: {
      initialAvatars: avatars,
    },
  };
}

export default function SsgPage({ initialAvatars = [] }: SsgPageProps) {
  const [avatars, setAvatars] = useState<string[]>(initialAvatars);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addAvatar = async () => {
    const newAvatarUrl = await fetchSingleAvatar();
    if (newAvatarUrl) {
      setAvatars([...avatars, newAvatarUrl]);
    }
    setLoading(false);
  };

  const refreshAvatar = async (index: number) => {
    const newAvatarUrl = await fetchSingleAvatar();
    if (newAvatarUrl) {
      const updatedAvatars = [...avatars];
      updatedAvatars[index] = newAvatarUrl;
      setAvatars(updatedAvatars);
    } else {
      alert("Could not fetch a valid avatar.");
    }
  };

  const refreshAllAvatars = async () => {
    setLoading(true);
    try {
      const newAvatars = await Promise.all(
        avatars.map(async () => fetchSingleAvatar())
      );
      setAvatars(newAvatars);
    } catch (error) {
      alert("Failed to fetch avatars.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main>
      <h1 className="text-4xl font-bold text-center">
        Avatars Gallery using Static Site Generation
      </h1>
      <div className={styles.App}>
        <div className={styles.avatarGridContainer}>
          <div className={styles.avatarGrid}>
            {avatars.map((url, index) => (
              <AvatarCard
                key={index}
                url={url}
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
  );
}
