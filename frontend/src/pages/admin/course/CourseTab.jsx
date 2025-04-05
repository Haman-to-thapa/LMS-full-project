
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseTab = () => {
  const navigate = useNavigate();
  const [previewThumbnail, setPreviewThumnail] = useState('');
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = () => {
    console.log(input);
  };

  const removeCourseHandler = () => {
    console.log("Course removed!");
  };

  const isPublished = false;
  const isLoading = false;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>Make changes to your courses here. Click save when you're done.</CardDescription>
        </div>
        <div className="space-x-2.5 flex">
          <Button variant="outline">{isPublished ? "Unpublish" : "Publish"}</Button>
          <Button onClick={removeCourseHandler}>Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input type="text" name="courseTitle" placeholder="Ex. FullStack developer" value={input.courseTitle} onChange={changeEventHandler} />
          </div>
          <div>
            <Label>SubTitle</Label>
            <Input type="text" placeholder="Ex. Become a FullStack developer from hero to hero" name="subTitle" onChange={changeEventHandler} value={input.subTitle} />
          </div>


          <div>
            <Label>Description</Label>
            <textarea rows={4}
              className='w-full'
              placeholder="write anythinga about "
              name='description'
              onChange={changeEventHandler}
              value={input.description}
            />


          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                    <SelectItem value="Tailwind">Tailwind</SelectItem>
                    <SelectItem value="Github">Github</SelectItem>
                    <SelectItem value="Next.js">Next.js</SelectItem>
                    <SelectItem value="React.js">React.js</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>CoursePrice</Label>
              <Input type="number" placeholder="199" name="coursePrice" onChange={changeEventHandler} value={input.coursePrice} />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file" accept="image/*" className="w-fit" onChange={selectThumbnail} />
            {previewThumbnail && <img src={previewThumbnail} className="w-64 my-2" alt="Course Thumbnail" />}
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate('/admin/course')}>Cancel</Button>
            <Button disabled={isLoading} className="flex items-center" onClick={updateCourseHandler}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "SAVE"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
