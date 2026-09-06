import { Link } from 'react-router-dom';
import Icon from './Icon';
import { ContactLink } from './ContactLink';

export default function MobileBar() {
  return (
    <div className="mbar" aria-label="Quick actions">
      <ContactLink type="call"><Icon id="i-phone" />Call</ContactLink>
      <ContactLink type="whatsapp"><Icon id="i-wa" />WhatsApp</ContactLink>
      <Link to="/contact">Request Quote</Link>
    </div>
  );
}