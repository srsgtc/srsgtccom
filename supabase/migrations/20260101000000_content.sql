CREATE TABLE public.site_content (
  id integer PRIMARY KEY,
  content jsonb NOT NULL DEFAULT '{}'::jsonb
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.site_content
  FOR SELECT
  USING (true);

INSERT INTO public.site_content (id, content) VALUES (1, '{}'::jsonb);

-- Set up Storage for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
CREATE POLICY "Allow public viewing of images" ON storage.objects FOR SELECT USING ( bucket_id = 'images' );
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'images' );
CREATE POLICY "Allow public updates" ON storage.objects FOR UPDATE USING ( bucket_id = 'images' );
