package com.nagarro.javaAdvance.assignment3.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serial;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;

import com.nagarro.javaAdvance.assignment3.hibernate.HibernateUtil;
import com.nagarro.javaAdvance.assignment3.model.Image;

/**
 * Servlet implementation class ImageEdit
 */
public class ImageEdit extends HttpServlet {
    @Serial
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("Welcome");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String str = request.getParameter("imageId");
        int id = Integer.parseInt(str);
        str = request.getParameter("newName");
        Session session = HibernateUtil.sf.openSession();
        session.beginTransaction();
        Image i = session.get(Image.class, id);
        i.setImgName(str);
        try {
            session.update(i);
            session.getTransaction().commit();
        } catch (Exception e) {
            session.getTransaction().rollback();
            session.close();
            PrintWriter out = response.getWriter();
            out.print("error");
            return;
        }
        session.close();
    }
}
