import type { ComponentType } from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

/**
 * The platforms the site knows how to render, shared by the footer's company
 * links and the team profile pages. One list, so adding a platform lights it up
 * in both places rather than in whichever file someone remembered to edit.
 *
 * Keys are the values the CMS stores in `socialLinks[].platform`; anything
 * unrecognised still renders as a plain text link rather than disappearing.
 */
export const socialLabels: Record<string, string> = {
  instagram: 'Instagram',
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  facebook: 'Facebook',
  threads: 'Threads',
  whatsapp: 'WhatsApp',
}

export const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebook,
  threads: FaThreads,
  whatsapp: FaWhatsapp,
}
