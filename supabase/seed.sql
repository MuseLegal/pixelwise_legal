insert into public.engagement_terms_versions (version_label, file_path, body_markdown, is_active)
values (
  'v1.0',
  '/engagement-letter-v1.pdf',
  'Pixelwise Legal engagement terms (MVP placeholder). This engagement is for business entities only. Attorney oversight applies to all legal deliverables.',
  true
)
on conflict (version_label) do nothing;
