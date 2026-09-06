import { useNavigate } from 'react-router-dom';
import { useToast } from './Toast';
import { useSiteContent } from '../content/SiteContentProvider';

export function useContactHref(type) {
  const { getPage } = useSiteContent();
  const CONTACT = getPage('sitewide').contact || {};
  if (type === 'call') return CONTACT.phone ? `tel:${CONTACT.phoneHref}` : null;
  if (type === 'whatsapp') return CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}` : null;
  if (type === 'email') return CONTACT.email ? `mailto:${CONTACT.email}` : null;
  return null;
}

export function ContactLink({ type, className = '', children, ...rest }) {
  const toast = useToast();
  const navigate = useNavigate();
  const href = useContactHref(type);
  const external = type === 'whatsapp' && href;

  if (href) {
    return (
      <a className={className} href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      className={className}
      href="/contact"
      onClick={e => {
        e.preventDefault();
        navigate('/contact');
        toast('Direct line details are being updated — please send a quote request and we\u2019ll call you back promptly.');
      }}
      {...rest}
    >
      {children}
    </a>
  );
}