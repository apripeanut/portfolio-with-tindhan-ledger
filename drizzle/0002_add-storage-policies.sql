-- Allow authenticated users to upload project images

CREATE POLICY "Admins upload project images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images'
);


-- Allow authenticated users to read project image records

CREATE POLICY "Admins read project image records"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'project-images'
);


-- Allow authenticated users to delete project images

CREATE POLICY "Admins delete project images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-images'
);