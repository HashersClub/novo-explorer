import { InscriptionResponse } from "../../lib/types";
import Iframe from "./Iframe";
import InscriptionRenderImage from "./InscriptionRenderImage";
import InscriptionRenderVideo from "./InscriptionRenderVideo";
import InscriptionRenderAudio from "./InscriptionRenderAudio";
import InscriptionRenderPDF from "./InscriptionRenderPDF";
import InscriptionRenderHTML from "./InscriptionRenderHTML";
import InscriptionRenderJson, {
  WithContentJson,
} from "./InscriptionRenderJson";
import InscriptionRenderText from "./InscriptionRenderText";

const InscriptionRender = (props: {
  inscription: InscriptionResponse;
  className?: string;
}) => {
  console.log("Inscription Response:", props.inscription); // Debug print
  console.log("Content type:", props.inscription.mime_type); // Debug print

  if (props.inscription.mime_type.startsWith("image/")) {
    return <InscriptionRenderImage {...props} />;
  }

  if (props.inscription.mime_type.startsWith("video/")) {
    return <InscriptionRenderVideo {...props} />;
  }

  if (props.inscription.mime_type.startsWith("audio/")) {
    return <InscriptionRenderAudio {...props} />;
  }
  
  if (props.inscription.mime_type.startsWith("application/pdf")) {
    return <InscriptionRenderPDF {...props} />;
  }
    
  if (props.inscription.mime_type.startsWith("application/json")) {
    return WithContentJson(props, InscriptionRenderJson);
  }

  if (props.inscription.mime_type.startsWith("text/html")) {
    return <InscriptionRenderHTML {...props} />;
  }

  if (props.inscription.mime_type.startsWith("text/")) {
    // also handles json parseable content from plain text
    return <InscriptionRenderText {...props} />;
  }

  // todo: add overlay without pointer events with a variant of the render component
  //       that can be used for non-clickable iframes (aka cards with links)
  //       this would need to go in the iframe component (wrap in div and add absoolute inset-0 overlay)
  return (
    <Iframe
      {...props}
      src={`${process.env.NEXT_PUBLIC_PREVIEW_URL}/preview/${props.inscription.id}`}
    />
  );
};

export default InscriptionRender;

