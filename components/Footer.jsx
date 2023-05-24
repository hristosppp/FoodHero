import { SocialIcon } from "react-social-icons";

export default function Footer() {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column fixed-bottom text-secondary bg-danger mt-50">
        <div className="text-primary">
          created by <strong>Hristos Pappas</strong>
        </div>
        <div className="m-2">
        <SocialIcon style={{height: "30px", width: "30px", marginRight: "7px"}} url="https://www.linkedin.com/in/hristos-pappas-447a92274/" />
        <SocialIcon style={{height: "30px", width: "30px"}} url="https://github.com/hristosppp" />
        </div>
      </div>
    )
  }