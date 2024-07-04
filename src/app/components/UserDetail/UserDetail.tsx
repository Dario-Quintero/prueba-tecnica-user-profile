import user from "../../user";
import Formulario from "../Formulario/Formulario";
import Image from "next/image";
import profile_avatar from "../../../../public/profile_avatar.png";
import s from "./userdetail.module.css"

export default function UserDetail() {
  return (
    <main className={s.container}>
      <header className={s.header}>
        <div>
          <Image
            className={`${s.profile_image} ${s.zoom} `}
            src={user.image_profile ? user.image_profile : profile_avatar}
            alt="Imagen de perfil"
            width={200}
          />
          <h1 className={`${s.zoom} ${s.h1}`}>{user.name}</h1>
          <p className={s.email_lg}>{user?.email}</p>
        </div>
        <div className={s.interests}>
          <p className={s.email_sm}>{user.email}</p>
          <ul className={s.ul}>
            {user?.interests.map((i) => (
              <li className={`${s.li} ${s.zoom}`}>{i}</li>
            ))}
          </ul>
        </div>
      </header>
      <div className={s.info}>
        <div className={s.about_me}>
          <h2 className={`${s.zoom} ${s.h2}`}>Sobre mí</h2>
          <p className={`${s.text} `}>{user.biography} </p>
        </div>
        <Formulario />
      </div>
    </main>
  );
}
